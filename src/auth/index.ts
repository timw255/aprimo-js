import axios from "axios";
import {
  AprimoAuthCredentialsError,
  AprimoAuthError,
  AprimoError,
} from "../errors";
import { DEFAULT_TIMEOUT_MS } from "../http";

const FALLBACK_TOKEN_TTL_MS = 9 * 60 * 1000;
const TOKEN_REFRESH_SKEW_MS = 30 * 1000;

export function getTokenExpiryMs(token: string): number {
  try {
    const payload = token.split(".")[1];
    if (!payload) return Date.now() + FALLBACK_TOKEN_TTL_MS;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );
    const json =
      typeof Buffer !== "undefined"
        ? Buffer.from(padded, "base64").toString("utf8")
        : atob(padded);
    const claims = JSON.parse(json) as { exp?: number };
    if (typeof claims.exp === "number") {
      return claims.exp * 1000;
    }
  } catch { }
  return Date.now() + FALLBACK_TOKEN_TTL_MS;
}

export function cacheTokenProvider(
  fetchToken: () => Promise<string>,
): () => Promise<string> {
  let cachedToken: string | null = null;
  let cachedExpiryMs = 0;
  let inflight: Promise<string> | null = null;

  return async () => {
    if (cachedToken && Date.now() < cachedExpiryMs - TOKEN_REFRESH_SKEW_MS) {
      return cachedToken;
    }
    if (inflight) return inflight;
    inflight = (async () => {
      try {
        const token = await fetchToken();
        cachedToken = token;
        cachedExpiryMs = getTokenExpiryMs(token);
        return token;
      } finally {
        inflight = null;
      }
    })();
    return inflight;
  };
}

export async function getClientCredentialsToken(
  environment: string,
  clientId: string,
  clientSecret: string,
  timeout?: number,
): Promise<string> {
  try {
    const response = await axios.post(
      `https://${environment}.aprimo.com/login/connect/token`,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        scope: "api",
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        timeout: timeout ?? DEFAULT_TIMEOUT_MS,
      },
    );

    return readAccessToken(response.data, "Client credentials");
  } catch (error) {
    throw toAuthError(error, "Client credentials");
  }
}

export async function getPasswordToken(
  environment: string,
  clientId: string,
  clientSecret: string,
  username: string,
  password: string,
  timeout?: number,
): Promise<string> {
  try {
    const response = await axios.post(
      `https://${environment}.aprimo.com/login/connect/token`,
      new URLSearchParams({
        grant_type: "password",
        client_id: clientId,
        client_secret: clientSecret,
        username,
        password,
        scope: "api",
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        timeout: timeout ?? DEFAULT_TIMEOUT_MS,
      },
    );

    return readAccessToken(response.data, "Password flow");
  } catch (error) {
    throw toAuthError(error, "Password flow");
  }
}

/**
 * Pull `access_token` out of a token-endpoint response. A 2xx response without
 * a usable token would otherwise be handed straight to the HTTP layer and sent
 * as the literal header `Authorization: Bearer undefined`, surfacing later as a
 * confusing 401 instead of an auth failure at the point of origin.
 */
function readAccessToken(data: unknown, flow: string): string {
  const token = (data as { access_token?: unknown } | undefined)?.access_token;

  if (typeof token !== "string" || token.length === 0) {
    throw new AprimoAuthError(
      `${flow} auth failed: token endpoint returned no access_token`,
      { raw: data },
    );
  }

  return token;
}

/**
 * Normalize anything thrown while requesting a token. A response-bearing axios
 * error means the credentials were rejected; a response-less one (timeout, DNS,
 * refused connection) is a transport failure and must not be reported as bad
 * credentials.
 */
function toAuthError(error: unknown, flow: string): AprimoError {
  if (error instanceof AprimoError) return error;

  if (axios.isAxiosError(error)) {
    if (error.response) {
      return new AprimoAuthCredentialsError(
        `${flow} auth failed: ${error.response.status} ${error.response.statusText}`,
        { status: error.response.status, cause: error },
      );
    }

    return new AprimoAuthError(
      `${flow} auth request failed: ${error.message}`,
      { cause: error },
    );
  }

  return new AprimoAuthError(`Unexpected error during ${flow} authentication`, {
    cause: error,
  });
}
