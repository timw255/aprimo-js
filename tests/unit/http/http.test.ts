import { describe, it, expect, vi, beforeEach } from "vitest";
import axios, { AxiosError } from "axios";
import { HttpClient } from "../../../src/http";

vi.mock("axios");
(axios as any).isAxiosError = (e: any): e is AxiosError =>
  e.isAxiosError === true;

const mockedAxios = axios as unknown as { request: ReturnType<typeof vi.fn> };

let tokenProvider: ReturnType<typeof vi.fn>;
let client: HttpClient;

beforeEach(() => {
  vi.resetAllMocks();
  tokenProvider = vi.fn().mockResolvedValue("mock-token");
  client = new HttpClient(tokenProvider, "https://api.test.com", {
    "X-App-Header": "static-header",
  });
});

// Helper to create a proper AxiosError with a mock response
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
      .mockRejectedValueOnce(err429) // First attempt fails
      .mockResolvedValueOnce({ status: 200, data: { success: true } }); // Second succeeds

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
});
