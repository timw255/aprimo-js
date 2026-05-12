import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import {
  AttachmentVersion,
  AttachmentVersionComment,
} from "../../../model/productivity/AttachmentVersion";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

/**
 * Payload for `attachmentVersions.create`. `FileId` / `FileName` come
 * from a prior PM-side {@link uploader} upload — pass the response
 * through verbatim. Use `options.attachment = true` on the upload so the
 * file lands in the attachment store rather than the digital-asset store.
 */
export interface CreateAttachmentVersionRequest {
  /** File id returned by the PM uploader (attachment mode). */
  FileId: string;
  /** File name returned by the PM uploader. */
  FileName: string;
  /** Mark this version as the default (`true`/`false`). */
  isDefaultVersion?: boolean;
  /** Parent attachment id (echoed in the URL). */
  attachmentId?: number;
  /** Version type id. */
  versionType?: number;
  /** Author comments on the version. */
  versionComments?: string;
  /** File name override. */
  filename?: string;
  /** Direct download URI. */
  downloadUri?: string;
  /** Version URL override. */
  versionUrl?: string;
  /** Thumbnail-processing status id. */
  thumbnailStatus?: number;
  /** Annotation file type id. */
  annotationFileType?: number;
  /** Whether to send notifications on create. */
  sendNotification?: number;
}

/**
 * Versions of an {@link Attachment}, with the comment stream attached to
 * each version. XFDF annotations on a version are exposed via
 * `getXfdfAnnotations`.
 */
export const attachmentVersions = (client: HttpClient) => ({
  /** List the versions on an attachment. */
  getByAttachmentId: async (
    attachmentId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<AttachmentVersion, "version" | "versions">>> => {
    return client.get(
      `/api/attachments/${attachmentId}/versions${buildQueryString(params)}`,
    );
  },

  /**
   * Add a new version to an attachment. Upload the binary with
   * {@link uploader} (in `attachment: true` mode) first.
   */
  create: async (
    attachmentId: number | string,
    request: CreateAttachmentVersionRequest,
  ): Promise<ApiResult<AttachmentVersion>> => {
    return client.post(
      `/api/attachments/${attachmentId}/versions`,
      request,
    );
  },

  /** Fetch a single version of an attachment. */
  getById: async (
    attachmentId: number | string,
    versionId: number | string,
  ): Promise<ApiResult<AttachmentVersion>> => {
    return client.get(`/api/attachments/${attachmentId}/versions/${versionId}`);
  },

  /** List the comments on a version. */
  getComments: async (
    attachmentId: number | string,
    versionId: number | string,
    params?: PmQueryParams,
  ): Promise<
    ApiResult<PmPagedCollection<AttachmentVersionComment, "comment" | "comments">>
  > => {
    return client.get(
      `/api/attachments/${attachmentId}/versions/${versionId}/comments${buildQueryString(params)}`,
    );
  },

  /**
   * Return the raw XFDF (Adobe annotation XML) for a version. Render
   * with a PDF library if you need to display the annotations.
   */
  getXfdfAnnotations: async (
    attachmentId: number | string,
    versionId: number | string,
  ): Promise<ApiResult<string>> => {
    return client.get(
      `/api/attachments/${attachmentId}/versions/${versionId}/xfdf-annotations`,
    );
  },
});
