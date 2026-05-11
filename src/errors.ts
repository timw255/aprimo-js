/**
 * Base class for every error the SDK produces.
 *
 * All thrown SDK errors and all `ApiResult.error` values are instances of
 * `AprimoError` or one of its subclasses. Use `instanceof` to narrow:
 *
 * @example
 * ```ts
 * const res = await aprimo.records.getById(id);
 * if (!res.ok) {
 *   if (res.error instanceof AprimoNotFoundError) {
 *     // Record didn't exist.
 *   } else if (res.error instanceof AprimoRateLimitError) {
 *     // Throttled — back off and retry.
 *   }
 * }
 * ```
 *
 * For backward compatibility with the SDK's earlier `error.type` / `error.raw`
 * shape, every instance also carries those properties.
 */
export class AprimoError extends Error {
  /**
   * Stable category string. Useful for logging and switch statements.
   * Preserved from the SDK's pre-typed-errors era so `switch (err.type)`
   * code still works.
   */
  readonly type: string;

  /**
   * Underlying cause — the original axios error, response body, or thrown
   * value that produced this `AprimoError`. Same value as `cause` in most
   * cases; named `raw` for backward compat with the legacy `ApiResult.error.raw`.
   */
  readonly raw?: unknown;

  /** Original cause (axios error, server response body, etc.). */
  readonly cause?: unknown;

  constructor(
    message: string,
    type: string,
    opts: AprimoErrorOptions = {},
  ) {
    super(message);
    this.name = "AprimoError";
    this.type = type;
    this.cause = opts.cause;
    this.raw = opts.raw ?? opts.cause;
    // Preserve prototype chain across the SDK's tsup CJS/ESM bundling.
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export interface AprimoErrorOptions {
  /** Original error or value that caused this one (axios error, etc.). */
  cause?: unknown;
  /** Overrides what surfaces on `error.raw`; defaults to `cause`. */
  raw?: unknown;
}

// ---------------------------------------------------------------------------
// HTTP family
// ---------------------------------------------------------------------------

export interface AprimoHttpErrorOptions extends AprimoErrorOptions {
  /** HTTP status code from the response. */
  status: number;
  /**
   * Server-supplied error code (Aprimo's `exceptionType` field on the
   * response body), if present.
   */
  aprimoErrorCode?: string;
  /** Parsed response body, if any. */
  responseBody?: unknown;
}

/**
 * Base class for all HTTP-status-driven failures. Carries the response
 * status and the server's parsed error body.
 *
 * Use the more specific subclasses (`AprimoNotFoundError`,
 * `AprimoRateLimitError`, etc.) when you can — they let you handle a single
 * category without falling through to a generic 4xx/5xx branch.
 */
export class AprimoHttpError extends AprimoError {
  readonly status: number;
  readonly aprimoErrorCode?: string;
  readonly responseBody?: unknown;

  constructor(
    message: string,
    opts: AprimoHttpErrorOptions,
    type: string = "HttpError",
  ) {
    super(message, type, {
      cause: opts.cause,
      raw: opts.responseBody ?? opts.cause,
    });
    this.name = "AprimoHttpError";
    this.status = opts.status;
    this.aprimoErrorCode = opts.aprimoErrorCode;
    this.responseBody = opts.responseBody;
  }
}

/** HTTP 400 — request was malformed or rejected as invalid. */
export class AprimoBadRequestError extends AprimoHttpError {
  constructor(message: string, opts: AprimoHttpErrorOptions) {
    super(message, opts, "BadRequest");
    this.name = "AprimoBadRequestError";
  }
}

/** HTTP 401 — token missing, expired, or invalid. */
export class AprimoUnauthorizedError extends AprimoHttpError {
  constructor(message: string, opts: AprimoHttpErrorOptions) {
    super(message, opts, "Unauthorized");
    this.name = "AprimoUnauthorizedError";
  }
}

/** HTTP 403 — token is valid but lacks permission for this operation. */
export class AprimoForbiddenError extends AprimoHttpError {
  constructor(message: string, opts: AprimoHttpErrorOptions) {
    super(message, opts, "Forbidden");
    this.name = "AprimoForbiddenError";
  }
}

/** HTTP 404 — the requested resource doesn't exist. */
export class AprimoNotFoundError extends AprimoHttpError {
  constructor(message: string, opts: AprimoHttpErrorOptions) {
    super(message, opts, "NotFound");
    this.name = "AprimoNotFoundError";
  }
}

/** HTTP 409 — request conflicted with current state (e.g., locked file). */
export class AprimoConflictError extends AprimoHttpError {
  constructor(message: string, opts: AprimoHttpErrorOptions) {
    super(message, opts, "Conflict");
    this.name = "AprimoConflictError";
  }
}

/** HTTP 422 — request shape OK but business validation rejected it. */
export class AprimoValidationError extends AprimoHttpError {
  constructor(message: string, opts: AprimoHttpErrorOptions) {
    super(message, opts, "ValidationError");
    this.name = "AprimoValidationError";
  }
}

export interface AprimoRateLimitErrorOptions extends AprimoHttpErrorOptions {
  /**
   * Value of the `Retry-After` response header, if the server sent one.
   * May be either a delay in seconds (e.g., `"30"`) or an HTTP-date string.
   */
  retryAfter?: string;
}

/**
 * HTTP 429 — request was throttled. If automatic retries are enabled and
 * exhausted, this is what surfaces.
 */
export class AprimoRateLimitError extends AprimoHttpError {
  readonly retryAfter?: string;

  constructor(message: string, opts: AprimoRateLimitErrorOptions) {
    super(message, opts, "RateLimit");
    this.name = "AprimoRateLimitError";
    this.retryAfter = opts.retryAfter;
  }
}

/** HTTP 5xx — server-side failure. */
export class AprimoServerError extends AprimoHttpError {
  constructor(message: string, opts: AprimoHttpErrorOptions) {
    super(message, opts, "ServerError");
    this.name = "AprimoServerError";
  }
}

// ---------------------------------------------------------------------------
// Transport / network
// ---------------------------------------------------------------------------

/**
 * The request never reached a response — DNS failure, connection refused,
 * TLS error, broken socket, etc.
 */
export class AprimoNetworkError extends AprimoError {
  constructor(message: string, opts: AprimoErrorOptions = {}) {
    super(message, "NetworkError", opts);
    this.name = "AprimoNetworkError";
  }
}

/** The request timed out before a response arrived. */
export class AprimoTimeoutError extends AprimoError {
  constructor(message: string, opts: AprimoErrorOptions = {}) {
    super(message, "TimeoutError", opts);
    this.name = "AprimoTimeoutError";
  }
}

/**
 * The request was cancelled — typically by an `AbortSignal` the caller passed
 * to the SDK.
 *
 * `type` is the legacy string `"AbortError"` (preserved from the uploader's
 * pre-typed-errors API).
 */
export class AprimoCancelledError extends AprimoError {
  constructor(message: string, opts: AprimoErrorOptions = {}) {
    super(message, "AbortError", opts);
    this.name = "AprimoCancelledError";
  }
}

// ---------------------------------------------------------------------------
// Authentication
// ---------------------------------------------------------------------------

/** Base class for authentication failures. */
export class AprimoAuthError extends AprimoError {
  constructor(
    message: string,
    opts: AprimoErrorOptions = {},
    type: string = "AuthError",
  ) {
    super(message, type, opts);
    this.name = "AprimoAuthError";
  }
}

export interface AprimoAuthCredentialsErrorOptions extends AprimoErrorOptions {
  /** HTTP status the token endpoint returned, if known. */
  status?: number;
}

/**
 * The token endpoint rejected the credentials (bad client id/secret,
 * bad password, etc.).
 */
export class AprimoAuthCredentialsError extends AprimoAuthError {
  readonly status?: number;

  constructor(message: string, opts: AprimoAuthCredentialsErrorOptions = {}) {
    super(message, opts, "AuthCredentialsError");
    this.name = "AprimoAuthCredentialsError";
    this.status = opts.status;
  }
}

/**
 * Auth configuration is wrong — e.g., `createClient` called with an unknown
 * `type`, or required fields missing for the chosen strategy.
 */
export class AprimoAuthConfigError extends AprimoAuthError {
  constructor(message: string, opts: AprimoErrorOptions = {}) {
    super(message, opts, "AuthConfigError");
    this.name = "AprimoAuthConfigError";
  }
}

// ---------------------------------------------------------------------------
// Uploader
// ---------------------------------------------------------------------------

/** Base class for failures inside `aprimo.uploader.uploadFile`. */
export class AprimoUploadError extends AprimoError {
  constructor(
    message: string,
    opts: AprimoErrorOptions = {},
    type: string = "UploadError",
  ) {
    super(message, type, opts);
    this.name = "AprimoUploadError";
  }
}

/**
 * The segmented-upload setup call failed (couldn't reserve an upload URI).
 *
 * `type` is the legacy string `"UploadSetupFailed"`.
 */
export class AprimoUploadSetupError extends AprimoUploadError {
  constructor(message: string, opts: AprimoErrorOptions = {}) {
    super(message, opts, "UploadSetupFailed");
    this.name = "AprimoUploadSetupError";
  }
}

export interface AprimoUploadSegmentErrorOptions extends AprimoErrorOptions {
  /** Index of the segment that failed (0-based). */
  segmentIndex: number;
}

/**
 * A specific segment failed to upload during a segmented upload.
 *
 * `type` is the legacy string `"UploadSegmentFailed"`. The failing segment
 * index is also exposed on `segmentIndex`.
 */
export class AprimoUploadSegmentError extends AprimoUploadError {
  readonly segmentIndex: number;

  constructor(message: string, opts: AprimoUploadSegmentErrorOptions) {
    super(message, opts, "UploadSegmentFailed");
    this.name = "AprimoUploadSegmentError";
    this.segmentIndex = opts.segmentIndex;
  }
}

/**
 * All segments uploaded successfully but the final commit call failed —
 * the server didn't accept the assembled file.
 *
 * `type` is the legacy string `"UploadCommitFailed"`.
 */
export class AprimoUploadCommitError extends AprimoUploadError {
  constructor(message: string, opts: AprimoErrorOptions = {}) {
    super(message, opts, "UploadCommitFailed");
    this.name = "AprimoUploadCommitError";
  }
}

// ---------------------------------------------------------------------------
// Programmer / configuration errors
// ---------------------------------------------------------------------------

/**
 * Programmer error — bad arguments, missing config, calling a feature in the
 * wrong environment (e.g., the browser-only Content Selector in Node).
 *
 * Thrown synchronously rather than returned in `ApiResult` because there's
 * no API call to wrap.
 */
export class AprimoConfigError extends AprimoError {
  constructor(message: string, opts: AprimoErrorOptions = {}) {
    super(message, "ConfigError", opts);
    this.name = "AprimoConfigError";
  }
}

// ---------------------------------------------------------------------------
// Type guards
// ---------------------------------------------------------------------------

/** Narrow an `unknown` to any SDK error. */
export function isAprimoError(e: unknown): e is AprimoError {
  return e instanceof AprimoError;
}

/** Narrow an `unknown` to an HTTP-status-driven error. */
export function isAprimoHttpError(e: unknown): e is AprimoHttpError {
  return e instanceof AprimoHttpError;
}

/** Narrow an `unknown` to a network/transport error. */
export function isAprimoNetworkError(e: unknown): e is AprimoNetworkError {
  return e instanceof AprimoNetworkError;
}

/** Narrow an `unknown` to a request timeout. */
export function isAprimoTimeoutError(e: unknown): e is AprimoTimeoutError {
  return e instanceof AprimoTimeoutError;
}

/** Narrow an `unknown` to an AbortSignal cancellation. */
export function isAprimoCancelledError(e: unknown): e is AprimoCancelledError {
  return e instanceof AprimoCancelledError;
}

/** Narrow an `unknown` to any auth failure. */
export function isAprimoAuthError(e: unknown): e is AprimoAuthError {
  return e instanceof AprimoAuthError;
}

/** Narrow an `unknown` to any upload failure. */
export function isAprimoUploadError(e: unknown): e is AprimoUploadError {
  return e instanceof AprimoUploadError;
}

/** Narrow an `unknown` to a programmer/config error. */
export function isAprimoConfigError(e: unknown): e is AprimoConfigError {
  return e instanceof AprimoConfigError;
}
