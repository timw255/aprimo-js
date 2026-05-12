import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import {
  DigitalAssetVersion,
  DigitalAssetVersionComment,
  DigitalAssetVersionTag,
} from "../../../model/productivity/DigitalAssetVersion";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

/**
 * Payload for `digitalAssetVersions.create`. `FileId` / `FileName` come
 * from a prior PM-side {@link uploader} upload — pass the response
 * through verbatim.
 */
export interface CreateDigitalAssetVersionRequest {
  /** File id returned by the PM uploader. */
  FileId: string;
  /** File name returned by the PM uploader. */
  FileName: string;
  /** Mark this version as the default (`true`/`false`). */
  isDefaultVersion?: boolean;
  /** Free-form version number string (e.g., `"1.2"`). */
  versionNumber?: string;
  /** Version date. */
  versionDate?: string;
  /** Version type id. */
  versionType?: number;
  /** Author comments on the version. */
  versionComments?: string;
  /** Thumbnail-processing status id. */
  thumbnailStatus?: number;
  /** File extension (without leading dot). */
  extension?: string;
  /** Whether a rendition exists for this version. */
  hasRendition?: boolean;
  /** Annotation file type id (PDF, image, etc.). */
  annotationFileType?: number;
  /** Whether the version is a reference document. */
  isReferenceDocument?: boolean;
  /** Whether DAM has a video preview ready. */
  isDamVideoPreviewAvailable?: boolean;
  /** Whether DAM has an image/document preview ready. */
  isDamPreviewAvailable?: boolean;
  /** Whether the underlying file is downloadable from DAM. */
  isDamFileAvailable?: boolean;
  /** Whether XFDF annotations exist for this version. */
  hasXfdfAnnotations?: boolean;
  /** Whether the file is eligible to be served from DAM. */
  isEligibleForDamContent?: boolean;
}

/** Payload for `digitalAssetVersions.updateTags`. */
export interface UpdateDigitalAssetVersionTagsRequest {
  /** Tag rows to upsert (partial — server merges by `tagId`). */
  tags: Partial<DigitalAssetVersionTag>[];
}

/**
 * Versions of a PM digital asset, plus the comment and tag streams
 * attached to each version. Use {@link uploader} to upload the binary
 * before calling `create` here.
 */
export const digitalAssetVersions = (client: HttpClient) => ({
  /** List the versions on an asset. */
  getByAssetId: async (
    assetId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<DigitalAssetVersion, "versions">>> => {
    return client.get(
      `/api/digital-assets/${assetId}/versions${buildQueryString(params)}`,
    );
  },

  /** Fetch a single version of an asset. */
  getById: async (
    assetId: number | string,
    versionId: number | string,
  ): Promise<ApiResult<DigitalAssetVersion>> => {
    return client.get(`/api/digital-assets/${assetId}/versions/${versionId}`);
  },

  /** List the comments on a version. */
  getComments: async (
    assetId: number | string,
    versionId: number | string,
    params?: PmQueryParams,
  ): Promise<
    ApiResult<PmPagedCollection<DigitalAssetVersionComment, "comment" | "comments">>
  > => {
    return client.get(
      `/api/digital-assets/${assetId}/versions/${versionId}/comments${buildQueryString(params)}`,
    );
  },

  /** List the tags on a version. */
  getTags: async (
    assetId: number | string,
    versionId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<DigitalAssetVersionTag, "tag" | "tags">>> => {
    return client.get(
      `/api/digital-assets/${assetId}/versions/${versionId}/tags/${buildQueryString(params)}`,
    );
  },

  /** Fetch a single tag by id. */
  getTagById: async (
    assetId: number | string,
    versionId: number | string,
    tagId: number | string,
  ): Promise<ApiResult<DigitalAssetVersionTag>> => {
    return client.get(
      `/api/digital-assets/${assetId}/versions/${versionId}/tags/${tagId}`,
    );
  },

  /**
   * Add a new version to an asset. Upload the binary with
   * {@link uploader} first, then pass its `FileId`/`FileName`.
   *
   * @example
   * ```ts
   * const upload = await aprimo.productivity.uploader.uploadFile(file);
   * if (upload.ok) {
   *   await aprimo.productivity.digitalAssetVersions.create(assetId, {
   *     FileId: upload.data!.FileId,
   *     FileName: upload.data!.FileName,
   *     isDefaultVersion: true,
   *   });
   * }
   * ```
   */
  create: async (
    assetId: number | string,
    request: CreateDigitalAssetVersionRequest,
  ): Promise<ApiResult<DigitalAssetVersion>> => {
    return client.post(`/api/digital-assets/${assetId}/versions`, request);
  },

  /** Bulk-update the tags on a version. */
  updateTags: async (
    assetId: number | string,
    versionId: number | string,
    request: UpdateDigitalAssetVersionTagsRequest,
  ): Promise<ApiResult<unknown>> => {
    return client.put(
      `/api/digital-assets/${assetId}/versions/${versionId}/tags`,
      request,
    );
  },
});
