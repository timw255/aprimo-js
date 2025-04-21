import { ApiResult } from "../../client";
import { HttpClient } from "../../http";

export type UploadTokenResponse = {
  token: string;
};

export type UploadSegmentSetupResponse = {
  uri: string;
};

export type UploadCommitResponse = {
  token: string;
};

export type UploadOptions = {
  segmentSize?: number;
  parallelLimit?: number;
  onProgress?: (uploaded: number, total: number) => void;
  signal?: AbortSignal;
};

export const uploader = (client: HttpClient) => ({
  uploadFile: async (
    file: File,
    options: UploadOptions = {},
  ): Promise<ApiResult<UploadTokenResponse>> => {
    const segmentSize = 20 * 1024 * 1024; // 20MB
    const hasCustomOptions = Object.keys(options).length > 0;
    const shouldUseLargeUpload = file.size > segmentSize || hasCustomOptions;

    if (shouldUseLargeUpload) {
      return await uploadLargeFile(client, file, options);
    } else {
      return await uploadSmallFile(client, file);
    }
  },
});

const uploadSmallFile = async (
  client: HttpClient,
  file: File,
): Promise<ApiResult<UploadTokenResponse>> => {
  const formData = new FormData();

  formData.append("file1", file, file.name);

  return client.post("/uploads", formData);
};

const uploadLargeFile = async (
  client: HttpClient,
  file: File,
  options: UploadOptions,
): Promise<ApiResult<UploadTokenResponse>> => {
  const setupRes = await client.post<UploadSegmentSetupResponse>(
    "/uploads/segments",
    { filename: file.name },
  );

  if (!setupRes.ok || !setupRes.data?.uri) {
    return {
      ok: false,
      status: setupRes.status,
      error: {
        type: "UploadSetupFailed",
        message: "Could not get upload URI",
        raw: setupRes,
      },
    };
  }

  const uploadPath = new URL(setupRes.data.uri).pathname;
  const segmentSize = (options?.segmentSize ?? 20) * 1024 * 1024;
  const segmentCount = Math.ceil(file.size / segmentSize);
  const uploaded = new Set<number>();
  const concurrency = options.parallelLimit ?? 1;
  let currentIndex = 0;
  let cancelled = false;

  const signal = options.signal;

  return new Promise<ApiResult<UploadTokenResponse>>((resolve) => {
    if (signal?.aborted) {
      resolve({
        ok: false,
        status: 499,
        error: {
          type: "AbortError",
          message: "Upload was cancelled before start",
        },
      });
      return;
    }

    const cancelUpload = async () => {
      cancelled = true;
      await client.delete(uploadPath);
      resolve({
        ok: false,
        status: 499,
        error: {
          type: "AbortError",
          message: "Upload was cancelled",
        },
      });
    };

    const onAbort = () => {
      cancelUpload();
    };

    signal?.addEventListener("abort", onAbort);

    const uploadNext = async () => {
      if (signal?.aborted || cancelled) return;

      const index = currentIndex++;
      if (index >= segmentCount) return;

      const start = index * segmentSize;
      const end = Math.min(start + segmentSize, file.size);
      const blob = file.slice(start, end);
      const formData = new FormData();
      formData.append(`segment${index}`, blob, `${file.name}.segment${index}`);

      const res = await client.post(`${uploadPath}?index=${index}`, formData);

      if (signal?.aborted || cancelled) return;

      if (!res.ok) {
        signal?.removeEventListener("abort", onAbort);
        resolve({
          ok: false,
          status: res.status,
          error: {
            type: "UploadSegmentFailed",
            message: `Segment ${index} failed to upload`,
            raw: res,
          },
        });
        return;
      }

      uploaded.add(index);
      options.onProgress?.(uploaded.size, segmentCount);

      if (uploaded.size === segmentCount) {
        const commitRes = await client.post<UploadCommitResponse>(
          `${uploadPath}/commit`,
          {
            filename: file.name,
            segmentcount: segmentCount,
          },
        );
        signal?.removeEventListener("abort", onAbort);
        resolve(commitRes);
        return;
      }

      uploadNext();
    };

    for (let i = 0; i < concurrency && i < segmentCount; i++) {
      uploadNext();
    }
  });
};
