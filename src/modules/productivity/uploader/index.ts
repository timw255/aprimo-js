import { ApiResult } from "../../../client";
import {
  AprimoCancelledError,
  AprimoUploadSegmentError,
} from "../../../errors";
import { HttpClient } from "../../../http";
import { buildQueryString } from "../../../utils";

/** Query payload used to check whether a specific chunk has been received. */
export interface ChunkUploadCheckParams {
  /** Original file name (used by the server to dedupe). */
  resumableFilename: string;
  /** 1-based chunk index. */
  resumableChunkNumber: number;
  /** Stable identifier shared across all chunks of one upload. */
  resumableIdentifier: string;
}

/** Payload sent to the `complete` endpoint to seal a chunked upload. */
export interface ChunkUploadCompleteRequest {
  /** Identifier the server should record as the final file id. */
  FileId: string;
  /** Original file name. */
  FileName: string;
}

/**
 * Options for `uploader.uploadFile`. Defaults to digital-asset uploads;
 * set `attachment: true` to route the upload to the attachment store
 * instead.
 */
export interface ChunkUploadOptions {
  /** Chunk size in bytes. Defaults to 20MB. */
  chunkSize?: number;
  /**
   * Maximum number of chunks to upload in parallel. Defaults to 1
   * (sequential).
   */
  parallelLimit?: number;
  /**
   * Caller-provided upload identifier. Pass to resume a partial upload;
   * omit to have the SDK generate a UUID.
   */
  identifier?: string;
  /**
   * Called after each chunk finishes with the running and total chunk
   * counts. Drive a progress bar with this.
   */
  onProgress?: (uploaded: number, total: number) => void;
  /** AbortSignal — aborting it cancels the upload. */
  signal?: AbortSignal;
  /**
   * Route the upload to the attachment endpoint instead of the
   * digital-asset endpoint. Required when feeding the result into
   * {@link attachmentVersions}.create.
   */
  attachment?: boolean;
}

const uploadPath = (forAttachment: boolean) =>
  forAttachment ? "/api/chunk/upload/attachment" : "/api/chunk/upload";
const completePath = (forAttachment: boolean) =>
  forAttachment ? "/api/chunk/complete/attachment" : "/api/chunk/complete";

/**
 * Chunked file uploader for the PM API. Pair with {@link
 * digitalAssetVersions}.create or {@link attachmentVersions}.create
 * (the latter requires `options.attachment = true`).
 *
 * The lower-level `checkChunk` / `uploadChunk` / `complete` methods are
 * exposed for callers that need to drive the resumable protocol
 * directly; most code should just use `uploadFile`.
 */
export const uploader = (client: HttpClient) => ({
  /**
   * Check whether the server has already received a specific chunk.
   * Useful for resumable uploads after a network hiccup.
   */
  checkChunk: async (
    params: ChunkUploadCheckParams,
    options: { attachment?: boolean } = {},
  ): Promise<ApiResult<unknown>> => {
    return client.get(
      `${uploadPath(options.attachment ?? false)}${buildQueryString({ ...params })}`,
    );
  },

  /** Upload a single chunk by index. */
  uploadChunk: async (
    chunk: Blob,
    params: ChunkUploadCheckParams,
    options: { attachment?: boolean } = {},
  ): Promise<ApiResult<unknown>> => {
    const formData = new FormData();
    formData.append("resumableFilename", params.resumableFilename);
    formData.append(
      "resumableChunkNumber",
      String(params.resumableChunkNumber),
    );
    formData.append("resumableIdentifier", params.resumableIdentifier);
    formData.append("file", chunk, params.resumableFilename);
    // Carries chunk data — opt out of the whole-request timeout.
    return client.post(
      uploadPath(options.attachment ?? false),
      formData,
      undefined,
      { timeout: 0 },
    );
  },

  /** Tell the server every chunk has been uploaded; seals the upload. */
  complete: async (
    request: ChunkUploadCompleteRequest,
    options: { attachment?: boolean } = {},
  ): Promise<ApiResult<unknown>> => {
    // Server assembles the chunks here — this can exceed the default timeout.
    return client.post(completePath(options.attachment ?? false), request, undefined, {
      timeout: 0,
    });
  },

  /**
   * Upload a file end-to-end via the PM chunk protocol. Returns the
   * `FileId` / `FileName` to hand off to `digitalAssetVersions.create`
   * (or `attachmentVersions.create` when `options.attachment` is true).
   *
   * On failure, `result.error` is a typed `AprimoError` subclass — use
   * `instanceof` against `AprimoCancelledError` and
   * `AprimoUploadSegmentError` for the upload-specific cases.
   *
   * @example
   * ```ts
   * const controller = new AbortController();
   *
   * const res = await aprimo.productivity.uploader.uploadFile(file, {
   *   chunkSize: 10 * 1024 * 1024,
   *   parallelLimit: 4,
   *   signal: controller.signal,
   *   onProgress: (done, total) => console.log(`${done}/${total}`),
   * });
   *
   * if (res.ok) {
   *   await aprimo.productivity.digitalAssetVersions.create(assetId, {
   *     FileId: res.data!.FileId,
   *     FileName: res.data!.FileName,
   *   });
   * }
   * ```
   */
  uploadFile: async (
    file: File,
    options: ChunkUploadOptions = {},
  ): Promise<ApiResult<{ FileId: string; FileName: string }>> => {
    const chunkSize = options.chunkSize ?? 20 * 1024 * 1024;
    const identifier = options.identifier ?? generateUuid();
    const chunkCount = Math.ceil(file.size / chunkSize);
    const concurrency = options.parallelLimit ?? 1;
    const uploaded = new Set<number>();
    const forAttachment = options.attachment ?? false;
    let nextIndex = 0;
    let cancelled = false;
    const signal = options.signal;

    return new Promise<ApiResult<{ FileId: string; FileName: string }>>(
      (resolve) => {
        if (signal?.aborted) {
          resolve({
            ok: false,
            status: 499,
            error: new AprimoCancelledError("Upload cancelled before start"),
          });
          return;
        }

        const onAbort = () => {
          cancelled = true;
          resolve({
            ok: false,
            status: 499,
            error: new AprimoCancelledError("Upload was cancelled"),
          });
        };
        signal?.addEventListener("abort", onAbort);

        const uploadNext = async () => {
          if (cancelled || signal?.aborted) return;
          const index = nextIndex++;
          if (index >= chunkCount) return;

          const start = index * chunkSize;
          const end = Math.min(start + chunkSize, file.size);
          const slice = file.slice(start, end);

          const res = await client.post(
            uploadPath(forAttachment),
            (() => {
              const fd = new FormData();
              fd.append("resumableFilename", file.name);
              fd.append("resumableChunkNumber", String(index + 1));
              fd.append("resumableIdentifier", identifier);
              fd.append("file", slice, file.name);
              return fd;
            })(),
            undefined,
            { timeout: 0, signal },
          );

          if (cancelled || signal?.aborted) return;

          if (!res.ok) {
            signal?.removeEventListener("abort", onAbort);
            resolve({
              ok: false,
              status: res.status,
              error: new AprimoUploadSegmentError(
                `Chunk ${index + 1} failed`,
                { segmentIndex: index, cause: res.error, raw: res },
              ),
            });
            return;
          }

          uploaded.add(index);
          options.onProgress?.(uploaded.size, chunkCount);

          if (uploaded.size === chunkCount) {
            const completeRes = await client.post<unknown>(
              completePath(forAttachment),
              { FileId: identifier, FileName: file.name },
              undefined,
              { timeout: 0, signal },
            );
            // An abort during complete is resolved by onAbort as a
            // cancellation; don't also report it as a failure.
            if (cancelled || signal?.aborted) return;
            signal?.removeEventListener("abort", onAbort);
            if (!completeRes.ok) {
              resolve({
                ok: false,
                status: completeRes.status,
                error: completeRes.error,
              });
              return;
            }
            resolve({
              ok: true,
              status: completeRes.status,
              data: { FileId: identifier, FileName: file.name },
            });
            return;
          }

          uploadNext();
        };

        for (let i = 0; i < concurrency && i < chunkCount; i++) {
          uploadNext();
        }
      },
    );
  },
});

function generateUuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
