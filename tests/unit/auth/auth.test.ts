import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cacheTokenProvider, getTokenExpiryMs } from "../../../src/auth";

function makeJwt(claims: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" })).toString(
    "base64url",
  );
  const payload = Buffer.from(JSON.stringify(claims)).toString("base64url");
  return `${header}.${payload}.signature`;
}

const FALLBACK_TTL_MS = 9 * 60 * 1000;
const SKEW_MS = 30 * 1000;

describe("getTokenExpiryMs", () => {
  it("returns the JWT exp claim in ms", () => {
    const expSec = Math.floor(Date.now() / 1000) + 600;
    const token = makeJwt({ exp: expSec });
    expect(getTokenExpiryMs(token)).toBe(expSec * 1000);
  });

  it("decodes base64url payloads with - and _ characters", () => {
    const expSec = Math.floor(Date.now() / 1000) + 1000;
    const claims = { exp: expSec, sub: "user>>?<<" };
    const standard = Buffer.from(JSON.stringify(claims)).toString("base64");
    const urlSafe = standard.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    const token = `header.${urlSafe}.sig`;
    expect(getTokenExpiryMs(token)).toBe(expSec * 1000);
  });

  it("falls back to default TTL when payload is unparseable", () => {
    const before = Date.now();
    const result = getTokenExpiryMs("not.a.real.jwt");
    const after = Date.now();
    expect(result).toBeGreaterThanOrEqual(before + FALLBACK_TTL_MS);
    expect(result).toBeLessThanOrEqual(after + FALLBACK_TTL_MS);
  });

  it("falls back to default TTL when token has no payload section", () => {
    const before = Date.now();
    const result = getTokenExpiryMs("opaque-token");
    const after = Date.now();
    expect(result).toBeGreaterThanOrEqual(before + FALLBACK_TTL_MS);
    expect(result).toBeLessThanOrEqual(after + FALLBACK_TTL_MS);
  });

  it("falls back to default TTL when exp claim is missing", () => {
    const token = makeJwt({ sub: "anonymous" });
    const before = Date.now();
    const result = getTokenExpiryMs(token);
    const after = Date.now();
    expect(result).toBeGreaterThanOrEqual(before + FALLBACK_TTL_MS);
    expect(result).toBeLessThanOrEqual(after + FALLBACK_TTL_MS);
  });
});

describe("cacheTokenProvider", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("reuses a single token across many sequential requests", async () => {
    const expSec = Math.floor(Date.now() / 1000) + 600;
    const token = makeJwt({ exp: expSec });
    const fetcher = vi.fn().mockResolvedValue(token);
    const provider = cacheTokenProvider(fetcher);

    for (let i = 0; i < 50; i++) {
      const t = await provider();
      expect(t).toBe(token);
    }
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("dedupes concurrent first requests into one in-flight fetch", async () => {
    const expSec = Math.floor(Date.now() / 1000) + 600;
    const token = makeJwt({ exp: expSec });
    let resolveFetch: ((v: string) => void) | undefined;
    const fetcher = vi.fn().mockImplementation(
      () =>
        new Promise<string>((resolve) => {
          resolveFetch = resolve;
        }),
    );
    const provider = cacheTokenProvider(fetcher);

    const calls = Promise.all([provider(), provider(), provider(), provider()]);
    expect(fetcher).toHaveBeenCalledTimes(1);

    resolveFetch!(token);
    const results = await calls;

    expect(results).toEqual([token, token, token, token]);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("refetches after the cached token expires", async () => {
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const firstExp = Math.floor(Date.now() / 1000) + 60;
    const secondExp = firstExp + 600;
    const first = makeJwt({ exp: firstExp });
    const second = makeJwt({ exp: secondExp });
    const fetcher = vi.fn().mockResolvedValueOnce(first).mockResolvedValueOnce(second);
    const provider = cacheTokenProvider(fetcher);

    expect(await provider()).toBe(first);
    expect(fetcher).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(120 * 1000);

    expect(await provider()).toBe(second);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it("refetches inside the refresh skew window before exp", async () => {
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const expSec = Math.floor(Date.now() / 1000) + 60;
    const first = makeJwt({ exp: expSec });
    const second = makeJwt({ exp: expSec + 600 });
    const fetcher = vi.fn().mockResolvedValueOnce(first).mockResolvedValueOnce(second);
    const provider = cacheTokenProvider(fetcher);

    expect(await provider()).toBe(first);

    vi.advanceTimersByTime(40 * 1000);

    expect(await provider()).toBe(second);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it("does not refetch within the cached window even close to skew boundary", async () => {
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const expSec = Math.floor(Date.now() / 1000) + 600;
    const token = makeJwt({ exp: expSec });
    const fetcher = vi.fn().mockResolvedValue(token);
    const provider = cacheTokenProvider(fetcher);

    expect(await provider()).toBe(token);

    vi.advanceTimersByTime(600 * 1000 - SKEW_MS - 1000);
    expect(await provider()).toBe(token);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("retries the fetcher on a later call after a failed fetch", async () => {
    const expSec = Math.floor(Date.now() / 1000) + 600;
    const token = makeJwt({ exp: expSec });
    const fetcher = vi
      .fn()
      .mockRejectedValueOnce(new Error("network down"))
      .mockResolvedValueOnce(token);
    const provider = cacheTokenProvider(fetcher);

    await expect(provider()).rejects.toThrow("network down");
    expect(await provider()).toBe(token);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it("uses fallback TTL caching for opaque tokens", async () => {
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce("opaque-1")
      .mockResolvedValueOnce("opaque-2");
    const provider = cacheTokenProvider(fetcher);

    expect(await provider()).toBe("opaque-1");
    vi.advanceTimersByTime(1 * 60 * 1000);
    expect(await provider()).toBe("opaque-1");
    expect(fetcher).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(FALLBACK_TTL_MS);
    expect(await provider()).toBe("opaque-2");
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});
