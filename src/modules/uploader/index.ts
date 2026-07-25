import { ApiResult } from "../../client";
import {
  AprimoCancelledError,
  AprimoUploadCommitError,
  AprimoUploadSegmentError,
  AprimoUploadSetupError,
} from "../../errors";
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

/**
 * Options for `uploader.uploadFile`.
 *
 * Files larger than 20MB (or any upload that passes options) are split into
 * segments and uploaded via the segmented-upload endpoint. Smaller files take
 * the single-shot path.
 */
export type UploadOptions = {
  /**
   * Segment size in **megabytes**. Defaults to 20MB. Smaller values trade
   * throughput for resilience on flaky connections.
   */
  segmentSize?: number;
  /**
   * Maximum number of segments to upload in parallel. Defaults to 1
   * (sequential). Higher values speed up large uploads if the environment
   * can sustain the bandwidth.
   */
  parallelLimit?: number;
  /**
   * Called after each segment finishes with the running and total segment
   * counts. Use it to drive progress UI.
   */
  onProgress?: (uploaded: number, total: number) => void;
  /**
   * AbortSignal that, when aborted, cancels the upload and resolves with
   * `error.type === "AbortError"`.
   */
  signal?: AbortSignal;
};

export const uploader = (client: HttpClient) => ({
  /**
   * Upload a file to Aprimo and return an upload token. Pass that token to
   * `aprimo.records.create({ files: { master: token, ... } })` to attach the
   * file to a new record.
   *
   * Small files (≤20MB and no options) take the single-shot path; larger
   * files (or any call that passes options) are uploaded in segments.
   *
   * On failure, `result.error.type` distinguishes the failure mode:
   * `"AbortError"`, `"UploadSetupFailed"`, `"UploadSegmentFailed"`, or
   * `"UploadCommitFailed"`.
   *
   * @param file - The `File` to upload.
   * @param options - Segment size, parallelism, progress, cancellation. See
   *   `UploadOptions`.
   * @returns `ApiResult` whose `data.token` is the upload token used to
   *   attach the file to a record.
   *
   * @example
   * ```ts
   * const file = new File([blob], "asset.mp4");
   * const res = await aprimo.uploader.uploadFile(file, {
   *   segmentSize: 10,
   *   parallelLimit: 4,
   *   onProgress: (done, total) => console.log(`${done}/${total}`),
   * });
   * if (res.ok) {
   *   const token = res.data!.token;
   *   // ...pass token to records.create...
   * }
   * ```
   */
  uploadFile: async (
    file: File,
    options: UploadOptions = {},
  ): Promise<ApiResult<UploadTokenResponse>> => {
    const segmentSize = 20 * 1024 * 1024;
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

  // Disable the whole-request timeout: this single request carries the entire
  // file, so a slow uplink would otherwise trip the client default.
  return client.post("/uploads", formData, undefined, { timeout: 0 });
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
      error: new AprimoUploadSetupError("Could not get upload URI", {
        cause: setupRes.error,
        raw: setupRes,
      }),
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
        error: new AprimoCancelledError("Upload was cancelled before start"),
      });
      return;
    }

    const cancelUpload = async () => {
      cancelled = true;
      await client.delete(uploadPath);
      resolve({
        ok: false,
        status: 499,
        error: new AprimoCancelledError("Upload was cancelled"),
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

      // Each segment carries file data — opt out of the whole-request timeout.
      // Pass the signal so an in-flight segment aborts at the socket.
      const res = await client.post(
        `${uploadPath}?index=${index}`,
        formData,
        undefined,
        { timeout: 0, signal },
      );

      if (signal?.aborted || cancelled) return;

      if (!res.ok) {
        signal?.removeEventListener("abort", onAbort);
        resolve({
          ok: false,
          status: res.status,
          error: new AprimoUploadSegmentError(
            `Segment ${index} failed to upload`,
            { segmentIndex: index, cause: res.error, raw: res },
          ),
        });
        return;
      }

      uploaded.add(index);
      options.onProgress?.(uploaded.size, segmentCount);

      if (uploaded.size === segmentCount) {
        // Commit can take a while server-side while segments are assembled.
        const commitRes = await client.post<UploadCommitResponse>(
          `${uploadPath}/commit`,
          {
            filename: file.name,
            segmentcount: segmentCount,
          },
          undefined,
          { timeout: 0, signal },
        );
        // An abort during commit is resolved by onAbort as a cancellation;
        // don't also report it as a commit failure.
        if (signal?.aborted || cancelled) return;
        signal?.removeEventListener("abort", onAbort);
        if (!commitRes.ok) {
          resolve({
            ok: false,
            status: commitRes.status,
            error: new AprimoUploadCommitError(
              "Upload commit failed after all segments uploaded",
              { cause: commitRes.error, raw: commitRes },
            ),
          });
          return;
        }
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
