import axios, { AxiosRequestConfig } from "axios";
import { ApiResult } from "./client";

export interface HttpClientOptions {
  maxRetries?: number;
  retryHandler?: (error: unknown, attempt: number) => Promise<boolean>;
}

export class HttpClient {
  constructor(
    private readonly tokenProvider: () => Promise<string>,
    private readonly baseUrl: string,
    private readonly baseHeaders: Record<string, string> = {},
    private readonly options: HttpClientOptions = {},
  ) {}

  async request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpoint: string,
    body?: unknown,
    headers: Record<string, string> = {},
  ): Promise<ApiResult<T>> {
    const token = await this.tokenProvider();
    const isFormData = body instanceof FormData;

    const config: AxiosRequestConfig = {
      method,
      url: `${this.baseUrl}${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...this.baseHeaders,
        ...headers,
      },
      data: body,
    };

    const maxAttempts = (this.options.maxRetries ?? 0) + 1;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await axios.request<T>(config);
        return { ok: true, status: response.status, data: response.data };
      } catch (error) {
        const isRetryable =
          axios.isAxiosError(error) && error.response?.status === 429;
        const wantsRetry =
          this.options.retryHandler &&
          (await this.options.retryHandler(error, attempt));

        if (!isRetryable || !wantsRetry || attempt === maxAttempts) {
          return this.handleAxiosError(error);
        }
      }
    }

    return {
      ok: false,
      status: 500,
      error: {
        type: "UnknownError",
        message: "Unexpected retry failure",
        raw: null,
      },
    };
  }

  private handleAxiosError(error: unknown): ApiResult<never> {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const data = error.response?.data;

      return {
        ok: false,
        status,
        error: {
          type: data?.exceptionType ?? "HttpError",
          message: data?.exceptionMessage ?? error.message,
          raw: data,
        },
      };
    }

    return {
      ok: false,
      status: 500,
      error: {
        type: "UnknownError",
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
        raw: error,
      },
    };
  }

  get<T>(url: string, headers?: Record<string, string>) {
    return this.request<T>("GET", url, undefined, headers);
  }

  post<T>(url: string, body: unknown, headers?: Record<string, string>) {
    return this.request<T>("POST", url, body, headers);
  }

  put<T>(url: string, body: unknown, headers?: Record<string, string>) {
    return this.request<T>("PUT", url, body, headers);
  }

  delete<T>(url: string, headers?: Record<string, string>) {
    return this.request<T>("DELETE", url, undefined, headers);
  }
}
