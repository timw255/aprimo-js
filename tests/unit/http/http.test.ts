import { describe, it, expect, vi, beforeEach } from "vitest";
import axios, { AxiosError } from "axios";
import { HttpClient } from "../../../src/http";
import { AprimoError, AprimoAuthCredentialsError } from "../../../src/errors";

vi.mock("axios");
(axios as any).isAxiosError = (e: any): e is AxiosError =>
  e.isAxiosError === true;

// HttpClient uses a private `axios.create()` instance; route its `.request`
// through a shared mock the tests can reconfigure per case.
const mockedAxios = { request: vi.fn() } as {
  request: ReturnType<typeof vi.fn>;
};
(axios as any).create = vi.fn(() => mockedAxios);

let tokenProvider: ReturnType<typeof vi.fn>;
let client: HttpClient;

beforeEach(() => {
  vi.resetAllMocks();
  (axios as any).create = vi.fn(() => mockedAxios);
  tokenProvider = vi.fn().mockResolvedValue("mock-token");
  client = new HttpClient(tokenProvider, "https://api.test.com", {
    "X-App-Header": "static-header",
  });
});

function createAxiosError(): AxiosError {
  const error = new AxiosError("fail") as AxiosError;

  Object.assign(error, {
    isAxiosError: true,
    response: {
      status: 400,
      statusText: "Bad Request",
      headers: {},
      config: {},
      data: {
        exceptionType: "BadRequest",
        exceptionMessage: "Something went wrong",
      },
      request: {},
    },
  });

  return error;
}

describe("HttpClient", () => {
  it("includes authorization header and merges headers", async () => {
    mockedAxios.request = vi.fn().mockResolvedValueOnce({
      status: 200,
      data: { hello: "world" },
    });

    const res = await client.get("/thing", { "X-Custom": "yes" });

    expect(res.ok).toBe(true);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      method: "GET",
      url: "https://api.test.com/thing",
      data: undefined,
      headers: expect.objectContaining({
        Authorization: "Bearer mock-token",
        "X-App-Header": "static-header",
        "X-Custom": "yes",
        "Content-Type": "application/json",
      }),
    });
  });

  it("omits Content-Type for FormData", async () => {
    const form = new FormData();
    mockedAxios.request = vi
      .fn()
      .mockResolvedValueOnce({ status: 200, data: {} });

    await client.post("/upload", form);

    const config = mockedAxios.request.mock.calls[0][0];
    expect(config.headers["Content-Type"]).toBeUndefined();
  });

  it("handles error with response gracefully", async () => {
    const err = createAxiosError();

    mockedAxios.request = vi.fn().mockRejectedValueOnce(err);

    const res = await client.get("/fail");
    expect(res.ok).toBe(false);
    expect(res.status).toBe(400);
    expect(res.error?.type).toBe("BadRequest");
    expect(res.error?.message).toBe("Something went wrong");
  });

  it("handles unexpected error fallback", async () => {
    mockedAxios.request = vi.fn().mockRejectedValueOnce(new Error("Boom"));

    const res = await client.get("/explode");
    expect(res.ok).toBe(false);
    expect(res.error?.type).toBe("UnknownError");
    expect(res.error?.message).toBe("Boom");
  });

  it("retries on 429 if retryHandler allows", async () => {
    const err429 = createAxiosError();
    err429.response!.status = 429;

    mockedAxios.request = vi
      .fn()
      .mockRejectedValueOnce(err429)
      .mockResolvedValueOnce({ status: 200, data: { success: true } });

    const retryHandler = vi.fn().mockResolvedValue(true);

    client = new HttpClient(
      tokenProvider,
      "https://api.test.com",
      {},
      {
        maxRetries: 2,
        retryHandler,
      },
    );

    const res = await client.get("/retry");

    expect(res.ok).toBe(true);
    expect(res.status).toBe(200);
    expect(retryHandler).toHaveBeenCalledTimes(1);
    expect(mockedAxios.request).toHaveBeenCalledTimes(2);
  });

  it("gives up if retryHandler disallows", async () => {
    const err429 = createAxiosError();
    err429.response!.status = 429;

    mockedAxios.request = vi.fn().mockRejectedValue(err429);

    const retryHandler = vi.fn().mockResolvedValue(false);

    client = new HttpClient(
      tokenProvider,
      "https://api.test.com",
      {},
      {
        maxRetries: 2,
        retryHandler,
      },
    );

    const res = await client.get("/no-retry");

    expect(res.ok).toBe(false);
    expect(res.status).toBe(429);
    expect(retryHandler).toHaveBeenCalledTimes(1);
    expect(mockedAxios.request).toHaveBeenCalledTimes(1);
  });

  it("returns an error envelope (does not throw) when the token provider fails", async () => {
    const failing = vi.fn().mockRejectedValue(new Error("token boom"));
    const c = new HttpClient(failing, "https://api.test.com");

    let threw = false;
    let res;
    try {
      res = await c.get("/thing");
    } catch {
      threw = true;
    }

    expect(threw).toBe(false);
    expect(res!.ok).toBe(false);
    expect(res!.error).toBeDefined();
    expect(mockedAxios.request).not.toHaveBeenCalled();
  });

  it("preserves an AprimoError thrown by the token provider", async () => {
    const authError = new AprimoError("bad credentials", "AuthError");
    const failing = vi.fn().mockRejectedValue(authError);
    const c = new HttpClient(failing, "https://api.test.com");

    const res = await c.get("/thing");

    expect(res.ok).toBe(false);
    expect(res.error).toBe(authError);
    expect(res.error?.type).toBe("AuthError");
  });

  it("uses the status from a thrown AprimoAuthCredentialsError", async () => {
    const authError = new AprimoAuthCredentialsError("bad credentials", {
      status: 401,
    });
    const failing = vi.fn().mockRejectedValue(authError);
    const c = new HttpClient(failing, "https://api.test.com");

    const res = await c.get("/thing");

    expect(res.ok).toBe(false);
    expect(res.error).toBe(authError);
    expect(res.status).toBe(401);
  });

  it("retries a 429 when maxRetries is set even without a retryHandler", async () => {
    const err429 = createAxiosError();
    err429.response!.status = 429;

    mockedAxios.request = vi
      .fn()
      .mockRejectedValueOnce(err429)
      .mockResolvedValueOnce({ status: 200, data: { success: true } });

    client = new HttpClient(
      tokenProvider,
      "https://api.test.com",
      {},
      { maxRetries: 2 },
    );

    const res = await client.get("/retry");

    expect(res.ok).toBe(true);
    expect(res.status).toBe(200);
    expect(mockedAxios.request).toHaveBeenCalledTimes(2);
  });

  it("does not invoke retryHandler for non-429 errors", async () => {
    const err500 = createAxiosError();
    err500.response!.status = 500;

    mockedAxios.request = vi.fn().mockRejectedValue(err500);

    const retryHandler = vi.fn().mockResolvedValue(true);

    client = new HttpClient(
      tokenProvider,
      "https://api.test.com",
      {},
      { maxRetries: 3, retryHandler },
    );

    const res = await client.get("/500");

    expect(res.ok).toBe(false);
    expect(retryHandler).not.toHaveBeenCalled();
    expect(mockedAxios.request).toHaveBeenCalledTimes(1);
  });

  it("reports status 0 (not 500) for network errors", async () => {
    const netErr = new AxiosError("getaddrinfo ENOTFOUND api.test.com");
    Object.assign(netErr, { isAxiosError: true, code: "ENOTFOUND" });

    mockedAxios.request = vi.fn().mockRejectedValue(netErr);

    const res = await client.get("/x");

    expect(res.ok).toBe(false);
    expect(res.error?.type).toBe("NetworkError");
    expect(res.status).toBe(0);
  });

  it("reports status 0 (not 500) for timeouts", async () => {
    const toErr = new AxiosError("timeout of 1ms exceeded");
    Object.assign(toErr, { isAxiosError: true, code: "ECONNABORTED" });

    mockedAxios.request = vi.fn().mockRejectedValue(toErr);

    const res = await client.get("/x");

    expect(res.ok).toBe(false);
    expect(res.error?.type).toBe("TimeoutError");
    expect(res.status).toBe(0);
  });

  it("rejects a negative maxRetries at construction", () => {
    expect(
      () =>
        new HttpClient(
          tokenProvider,
          "https://api.test.com",
          {},
          { maxRetries: -1 },
        ),
    ).toThrow("maxRetries must be >= 0");
  });
});
