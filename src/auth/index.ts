import axios, { AxiosError } from "axios";

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
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );

    return response.data.access_token;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        `Client credentials auth failed: ${error.response?.status} ${error.response?.statusText}`,
      );
    }

    throw new Error(
      "Unexpected error during client credentials authentication",
    );
  }
}

export async function getPasswordToken(
  environment: string,
  clientId: string,
  clientSecret: string,
  username: string,
  password: string,
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
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );

    return response.data.access_token;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        `Password flow auth failed: ${error.response?.status} ${error.response?.statusText}`,
      );
    }

    throw new Error("Unexpected error during password authentication");
  }
}
