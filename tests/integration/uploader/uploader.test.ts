import { describe, it, expect, vi } from "vitest";
import { createClient } from "../../../src";
import { expectOk } from "../../utils";
import type { ApiResult } from "../../../src/client";
import type { UploadSegmentSetupResponse } from "../../../src/modules/uploader";

// Simulate a file object in Node for test purposes
function createMockFile(name: string, size: number): File {
  const blob = new Blob([new Uint8Array(size).fill(1)], {
    type: "application/octet-stream",
  });
  return new File([blob], name, { type: "application/octet-stream" });
}

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("uploader integration", () => {
  it("uploads a small file", async () => {
    const file = createMockFile("smallfile.txt", 5 * 1024 * 1024); // 5MB
    const res = await aprimo.uploader.uploadFile(file);
    expectOk(res);
    expect(res.data?.token).toBeTruthy();
  });

  it("uploads a large file in segments", async () => {
    const file = createMockFile("largefile.txt", 25 * 1024 * 1024); // 25MB
    const res = await aprimo.uploader.uploadFile(file);
    expectOk(res);
    expect(res.data?.token).toBeTruthy();
  });

  it("tracks progress during large upload", async () => {
    const file = createMockFile("progressfile.txt", 25 * 1024 * 1024);
    const progressCb = vi.fn();

    const res = await aprimo.uploader.uploadFile(file, {
      parallelLimit: 1,
      onProgress: progressCb,
    });

    expectOk(res);
    expect(res.data?.token).toBeTruthy();
    expect(progressCb).toHaveBeenCalled();
    expect(progressCb.mock.calls.some(([bytes]) => bytes > 0)).toBe(true);
  });

  it("supports cancelling a large upload", async () => {
    const file = createMockFile("canceltest.txt", 40 * 1024 * 1024);
    const controller = new AbortController();

    setTimeout(() => controller.abort(), 100);

    const res = await aprimo.uploader.uploadFile(file, {
      parallelLimit: 1,
      signal: controller.signal,
    });

    expect(res.ok).toBe(false);
    expect(res.error?.type).toBe("AbortError");
  });

  it("fails when a segment fails to upload", async () => {
    const file = createMockFile("segmentfail.txt", 25 * 1024 * 1024);
    const spy = vi.spyOn(aprimo["moHttp"], "post");

    spy
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            ok: true,
            data: { uri: "https://localhost/fake/uri" },
          }) as Promise<ApiResult<UploadSegmentSetupResponse>>,
      )
      .mockImplementationOnce(
        () =>
          Promise.resolve({ ok: false, status: 500 }) as Promise<
            ApiResult<unknown>
          >,
      );

    const res = await aprimo.uploader.uploadFile(file);
    expect(res.ok).toBe(false);
    expect(res.error?.type).toBe("UploadSegmentFailed");
  });

  it("fails if commit request fails", async () => {
    const file = createMockFile("commitfail.txt", 25 * 1024 * 1024);
    const spy = vi.spyOn(aprimo["moHttp"], "post");

    spy
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            ok: true,
            data: { uri: "https://localhost/fake/uri" },
          }) as Promise<ApiResult<UploadSegmentSetupResponse>>,
      )
      .mockImplementationOnce(
        () => Promise.resolve({ ok: true }) as Promise<ApiResult<unknown>>,
      )
      .mockImplementationOnce(
        () =>
          Promise.resolve({ ok: false, status: 500 }) as Promise<
            ApiResult<unknown>
          >,
      );

    const res = await aprimo.uploader.uploadFile(file);
    expect(res.ok).toBe(false);
  });

  it("aborts immediately if signal is already aborted", async () => {
    const file = createMockFile("preaborted.txt", 25 * 1024 * 1024);
    const controller = new AbortController();
    controller.abort(); // Abort before calling upload
  
    const res = await aprimo.uploader.uploadFile(file, {
      signal: controller.signal,
    });
  
    expect(res.ok).toBe(false);
    expect(res.error?.type).toBe("AbortError");
  });
});
