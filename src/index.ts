import { Aprimo } from "./client";
import {
  cacheTokenProvider,
  getClientCredentialsToken,
  getPasswordToken,
} from "./auth";
import { AprimoAuthConfigError } from "./errors";
import { HttpClientOptions } from "./http";

/**
 * Authentication strategy for `createClient`.
 *
 * - `client_credentials`: service-to-service flow (scripts, background jobs).
 *   Token is fetched and cached automatically.
 * - `password`: act on behalf of a real user without a browser login.
 *   Token is fetched and cached automatically.
 * - `custom`: bring your own token provider — useful for browser flows
 *   (PKCE + refresh) where you already manage token lifecycle.
 *
 * See the README "Authentication" section for the full setup walkthrough.
 */
export type AuthStrategy =
  | { type: "client_credentials"; clientId: string; clientSecret: string }
  | {
      type: "password";
      clientId: string;
      clientSecret: string;
      username: string;
      password: string;
    }
  | { type: "custom"; tokenProvider: () => Promise<string> };

/**
 * Options for `createClient`. `environment` is the Aprimo subdomain
 * (the `<env>` in `https://<env>.aprimo.com`).
 */
export type CreateClientOptions = {
  /** Your Aprimo subdomain — e.g., `"acme"` for `acme.aprimo.com`. */
  environment: string;
  /**
   * Whole-request timeout in milliseconds applied to every request (includes
   * upload/download time). Defaults to 30000. Pass `0` to disable. Uploads
   * opt out of this default internally so large transfers are not clipped.
   */
  timeout?: number;
  /** Maximum number of retries for retryable (HTTP 429) responses. */
  maxRetries?: number;
  /**
   * Called before each retry with the error and 1-based attempt number.
   * Return `true` to allow the retry, `false` to stop.
   */
  retryHandler?: (error: unknown, attempt: number) => Promise<boolean>;
} & AuthStrategy;

/**
 * Construct an authenticated Aprimo SDK client.
 *
 * The returned `Aprimo` instance exposes one property per API module
 * (`records`, `files`, `search`, `uploader`, ...). For the credential and
 * password flows the SDK caches and refreshes tokens for you; with the
 * `custom` flow you own that lifecycle.
 *
 * @example
 * ```ts
 * import { createClient } from "aprimo-js";
 *
 * const aprimo = createClient({
 *   type: "client_credentials",
 *   environment: "your-subdomain",
 *   clientId: "your-client-id",
 *   clientSecret: "your-client-secret",
 * });
 *
 * const res = await aprimo.records.get({ pageSize: 50 });
 * ```
 */
export function createClient(options: CreateClientOptions): Aprimo {
  const { environment, timeout, maxRetries, retryHandler } = options;

  const httpOptions: HttpClientOptions = { timeout, maxRetries, retryHandler };

  let tokenProvider: () => Promise<string>;

  if (options.type === "client_credentials") {
    const { clientId, clientSecret } = options;
    tokenProvider = cacheTokenProvider(() =>
      getClientCredentialsToken(environment, clientId, clientSecret),
    );
  } else if (options.type === "password") {
    const { clientId, clientSecret, username, password } = options;
    tokenProvider = cacheTokenProvider(() =>
      getPasswordToken(environment, clientId, clientSecret, username, password),
    );
  } else if (options.type === "custom") {
    tokenProvider = options.tokenProvider;
  } else {
    throw new AprimoAuthConfigError(
      `Invalid authentication strategy: ${JSON.stringify((options as { type?: unknown }).type)}`,
    );
  }

  return new Aprimo(environment, tokenProvider, httpOptions);
}

export { Aprimo };
export { computeSetActions } from "./utils";
export { Expander } from "./expander";

// Error classes — see `src/errors.ts` for the full hierarchy. Use `instanceof`
// to narrow `ApiResult.error` (or thrown values from `createClient`,
// `aprimo.uploader.uploadFile`, etc.).
export {
  AprimoError,
  AprimoHttpError,
  AprimoBadRequestError,
  AprimoUnauthorizedError,
  AprimoForbiddenError,
  AprimoNotFoundError,
  AprimoConflictError,
  AprimoValidationError,
  AprimoRateLimitError,
  AprimoServerError,
  AprimoNetworkError,
  AprimoTimeoutError,
  AprimoCancelledError,
  AprimoAuthError,
  AprimoAuthCredentialsError,
  AprimoAuthConfigError,
  AprimoUploadError,
  AprimoUploadSetupError,
  AprimoUploadSegmentError,
  AprimoUploadCommitError,
  AprimoConfigError,
  isAprimoError,
  isAprimoHttpError,
  isAprimoNetworkError,
  isAprimoTimeoutError,
  isAprimoCancelledError,
  isAprimoAuthError,
  isAprimoUploadError,
  isAprimoConfigError,
} from "./errors";
export type {
  AprimoErrorOptions,
  AprimoHttpErrorOptions,
  AprimoRateLimitErrorOptions,
  AprimoAuthCredentialsErrorOptions,
  AprimoUploadSegmentErrorOptions,
} from "./errors";
