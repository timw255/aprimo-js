import { ApiResult } from "../../../client";
import {
  AprimoCancelledError,
  AprimoUploadSegmentError,
} from "../../../errors";
import { HttpClient } from "../../../http";
import { buildQueryString } from "../../../utils";

export interface ChunkUploadCheckParams {
  resumableFilename: string;
  resumableChunkNumber: number;
  resumableIdentifier: string;
}

export interface ChunkUploadCompleteRequest {
  FileId: string;
  FileName: string;
}

export interface ChunkUploadOptions {
  chunkSize?: number;
  parallelLimit?: number;
  identifier?: string;
  onProgress?: (uploaded: number, total: number) => void;
  signal?: AbortSignal;
  attachment?: boolean;
}

const uploadPath = (forAttachment: boolean) =>
  forAttachment ? "/api/chunk/upload/attachment" : "/api/chunk/upload";
const completePath = (forAttachment: boolean) =>
  forAttachment ? "/api/chunk/complete/attachment" : "/api/chunk/complete";

export const uploader = (client: HttpClient) => ({
  checkChunk: async (
    params: ChunkUploadCheckParams,
    options: { attachment?: boolean } = {},
  ): Promise<ApiResult<unknown>> => {
    return client.get(
      `${uploadPath(options.attachment ?? false)}${buildQueryString({ ...params })}`,
    );
  },

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
    return client.post(uploadPath(options.attachment ?? false), formData);
  },

  complete: async (
    request: ChunkUploadCompleteRequest,
    options: { attachment?: boolean } = {},
  ): Promise<ApiResult<unknown>> => {
    return client.post(completePath(options.attachment ?? false), request);
  },

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
            );
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
