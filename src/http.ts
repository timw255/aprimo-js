import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { ApiResult } from "./client";
import {
  AprimoAuthCredentialsError,
  AprimoBadRequestError,
  AprimoCancelledError,
  AprimoConfigError,
  AprimoConflictError,
  AprimoError,
  AprimoForbiddenError,
  AprimoHttpError,
  AprimoHttpErrorOptions,
  AprimoNetworkError,
  AprimoNotFoundError,
  AprimoRateLimitError,
  AprimoServerError,
  AprimoTimeoutError,
  AprimoUnauthorizedError,
  AprimoValidationError,
} from "./errors";

/** Default whole-request timeout in milliseconds. */
export const DEFAULT_TIMEOUT_MS = 30_000;

export interface HttpClientOptions {
  maxRetries?: number;
  retryHandler?: (error: unknown, attempt: number) => Promise<boolean>;
  /**
   * Whole-request timeout in milliseconds (includes upload/download time).
   * Defaults to {@link DEFAULT_TIMEOUT_MS}. Pass `0` to disable the timeout.
   */
  timeout?: number;
}

/** Per-request overrides that callers can pass on individual verb methods. */
export interface RequestOptions {
  /** Cancel the request when this signal aborts (→ `AprimoCancelledError`). */
  signal?: AbortSignal;
  /**
   * Whole-request timeout in milliseconds for this call only, overriding the
   * client default. Pass `0` to disable the timeout (e.g., large uploads).
   */
  timeout?: number;
}

export class HttpClient {
  private readonly http: AxiosInstance;

  constructor(
    private readonly tokenProvider: () => Promise<string>,
    private readonly baseUrl: string,
    private readonly baseHeaders: Record<string, string> = {},
    private readonly options: HttpClientOptions = {},
  ) {
    if (this.options.maxRetries !== undefined && this.options.maxRetries < 0) {
      throw new AprimoConfigError(
        `maxRetries must be >= 0 (received ${this.options.maxRetries})`,
      );
    }

    this.http = axios.create({
      timeout: this.options.timeout ?? DEFAULT_TIMEOUT_MS,
    });
  }

  async request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpoint: string,
    body?: unknown,
    headers: Record<string, string> = {},
    opts: RequestOptions = {},
  ): Promise<ApiResult<T>> {
    let config: AxiosRequestConfig;
    try {
      const token = await this.tokenProvider();
      const isFormData = body instanceof FormData;

      config = {
        method,
        url: `${this.baseUrl}${endpoint}`,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          ...this.baseHeaders,
          ...headers,
        },
        data: body,
        signal: opts.signal,
        ...(opts.timeout !== undefined ? { timeout: opts.timeout } : {}),
      };
    } catch (error) {
      // Token acquisition failed before the request was ever sent. Funnel it
      // through the envelope rather than rejecting — callers rely on `request`
      // always resolving to an `ApiResult`.
      return this.handleAxiosError(error);
    }

    // `maxRetries` is validated to be >= 0 at construction, so this is >= 1.
    const maxAttempts = (this.options.maxRetries ?? 0) + 1;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await this.http.request<T>(config);
        return { ok: true, status: response.status, data: response.data };
      } catch (error) {
        const isRetryable =
          axios.isAxiosError(error) && error.response?.status === 429;
        const canRetry = isRetryable && attempt < maxAttempts;

        // Only consult the retry handler for errors we can actually retry.
        // When no handler is supplied, a retryable error retries by default.
        const wantsRetry =
          canRetry &&
          (this.options.retryHandler
            ? await this.options.retryHandler(error, attempt)
            : true);

        if (!wantsRetry) {
          return this.handleAxiosError(error);
        }
      }
    }

    // Unreachable while `maxAttempts >= 1` (the final attempt always returns
    // inside the loop); present only to satisfy the return type.
    return this.handleAxiosError(new Error("Request failed"));
  }

  private handleAxiosError(error: unknown): ApiResult<never> {
    const sdkError = translateAxiosError(error);
    return { ok: false, status: deriveStatus(error, sdkError), error: sdkError };
  }

  get<T>(url: string, headers?: Record<string, string>, opts?: RequestOptions) {
    return this.request<T>("GET", url, undefined, headers, opts);
  }

  post<T>(
    url: string,
    body: unknown,
    headers?: Record<string, string>,
    opts?: RequestOptions,
  ) {
    return this.request<T>("POST", url, body, headers, opts);
  }

  put<T>(
    url: string,
    body: unknown,
    headers?: Record<string, string>,
    opts?: RequestOptions,
  ) {
    return this.request<T>("PUT", url, body, headers, opts);
  }

  delete<T>(url: string, headers?: Record<string, string>, opts?: RequestOptions) {
    return this.request<T>("DELETE", url, undefined, headers, opts);
  }
}

/**
 * Map an axios error (or any thrown value) to the most specific `AprimoError`
 * subclass we can. Status-driven errors come back as `AprimoHttpError`
 * subclasses; transport errors as `AprimoNetworkError` / `AprimoTimeoutError`
 * / `AprimoCancelledError`; anything we can't classify as the base
 * `AprimoError`.
 */
function translateAxiosError(error: unknown): AprimoError {
  // Already an SDK error (e.g. thrown by the token provider) — preserve its
  // specific type rather than flattening it into a generic UnknownError.
  if (error instanceof AprimoError) {
    return error;
  }

  if (!axios.isAxiosError(error)) {
    return new AprimoError(
      error instanceof Error ? error.message : "An unknown error occurred",
      "UnknownError",
      { cause: error, raw: error },
    );
  }

  const axiosError = error as AxiosError<{
    exceptionType?: string;
    exceptionMessage?: string;
  }>;

  // Cancellation (AbortSignal etc.) takes priority — axios sets ERR_CANCELED.
  if (axios.isCancel(axiosError) || axiosError.code === "ERR_CANCELED") {
    return new AprimoCancelledError(axiosError.message || "Request was cancelled", {
      cause: axiosError,
    });
  }

  // Timeout — axios sets ECONNABORTED for timeouts, ETIMEDOUT for some Node errors.
  if (axiosError.code === "ECONNABORTED" || axiosError.code === "ETIMEDOUT") {
    return new AprimoTimeoutError(axiosError.message || "Request timed out", {
      cause: axiosError,
    });
  }

  // Network failure — no response arrived (DNS, ECONNREFUSED, TLS, etc.).
  if (!axiosError.response) {
    return new AprimoNetworkError(
      axiosError.message || "Network request failed",
      { cause: axiosError },
    );
  }

  const status = axiosError.response.status;
  const data = axiosError.response.data;
  const aprimoErrorCode = data?.exceptionType;
  const message = data?.exceptionMessage ?? axiosError.message;

  const opts: AprimoHttpErrorOptions = {
    status,
    aprimoErrorCode,
    responseBody: data,
    cause: axiosError,
  };

  if (status === 400) return new AprimoBadRequestError(message, opts);
  if (status === 401) return new AprimoUnauthorizedError(message, opts);
  if (status === 403) return new AprimoForbiddenError(message, opts);
  if (status === 404) return new AprimoNotFoundError(message, opts);
  if (status === 409) return new AprimoConflictError(message, opts);
  if (status === 422) return new AprimoValidationError(message, opts);
  if (status === 429) {
    const retryAfter = extractRetryAfter(axiosError);
    return new AprimoRateLimitError(message, { ...opts, retryAfter });
  }
  if (status >= 500 && status < 600) return new AprimoServerError(message, opts);

  // Other 4xx (or anything else with a response) — generic HTTP error.
  return new AprimoHttpError(message, opts);
}

function deriveStatus(error: unknown, sdkError: AprimoError): number {
  if (sdkError instanceof AprimoHttpError) return sdkError.status;
  if (axios.isAxiosError(error) && error.response?.status) {
    return error.response.status;
  }
  // Cancelled requests: preserve the SDK's pre-existing 499 convention.
  if (sdkError instanceof AprimoCancelledError) return 499;
  // Auth-credential failures (e.g. thrown by the token provider) carry their
  // own HTTP status even though they are not `AprimoHttpError`s.
  if (
    sdkError instanceof AprimoAuthCredentialsError &&
    sdkError.status !== undefined
  ) {
    return sdkError.status;
  }
  // Transport failures never received an HTTP response — report 0 ("no status")
  // rather than masquerading as a server 500.
  if (
    sdkError instanceof AprimoNetworkError ||
    sdkError instanceof AprimoTimeoutError
  ) {
    return 0;
  }
  return 500;
}

function extractRetryAfter(error: AxiosError): string | undefined {
  const headers = error.response?.headers as
    | Record<string, string | string[] | undefined>
    | undefined;
  if (!headers) return undefined;
  const value = headers["retry-after"] ?? headers["Retry-After"];
  if (Array.isArray(value)) return value[0];
  return value;
}
