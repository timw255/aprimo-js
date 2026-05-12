import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Activity } from "../../../model/productivity/Activity";
import { Attachment } from "../../../model/productivity/Attachment";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { PmSearchRequest } from "../../../model/productivity/PmSearchRequest";
import { buildQueryString } from "../../../utils";

/** Payload for `attachments.create`. */
export interface CreateAttachmentRequest {
  /** Display title. */
  title: string;
  /** Id of the object the attachment is attached to. */
  objectId: number;
  /** Type id of the object (see `PmObjectTypeIds`). */
  objectTypeId: number;
  /** Attachment type id. */
  attachmentTypeId?: number;
  /** Whether the attachment is visible in projects (`true`/`false`). */
  projectVisibility?: boolean;
  /** Sub-category label for the attachment. */
  attachmentType?: string;
  /** PM user id of the creator. */
  creatorId?: number;
  /** File id of a custom thumbnail. */
  customThumb?: number;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** Projects to link the attachment to on create (open-ended schema). */
  projects?: unknown[];
  /** Activity-project list scoping flag. */
  activityProjectList?: number;
  /** Whether to send notifications on create. */
  sendNotification?: number;
}

/** Payload for `attachments.update`. */
export type UpdateAttachmentRequest = Partial<CreateAttachmentRequest>;

/** Search payload — uses the generic PM search-tree grammar. */
export type AttachmentSearchRequest = PmSearchRequest;

/**
 * Attachments — files attached to PM objects (activities, projects,
 * tasks). Distinct from PM digital assets; attachments are simpler
 * and don't have rendition/folder/annotation graphs. Use
 * {@link attachmentVersions} to version them.
 */
export const attachments = (client: HttpClient) => ({
  /** Fetch a single attachment by id. */
  getById: async (id: number | string): Promise<ApiResult<Attachment>> => {
    return client.get(`/api/attachments/${id}`);
  },

  /** List the attachments linked to a project. */
  getByProjectId: async (
    projectId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Attachment, "Attachment">>> => {
    return client.get(
      `/api/projects/${projectId}/attachments${buildQueryString(params)}`,
    );
  },

  /**
   * Resolve the activity this attachment is associated with.
   * Specialized lookup — server traces the attachment back through its
   * `objectId`/`objectTypeId` pair to find the owning activity.
   */
  getActivity: async (id: number | string): Promise<ApiResult<Activity>> => {
    return client.get(`/api/attachments/${id}/activity`);
  },

  /** List the review-required documents attached to this attachment. */
  getReviewRequiredDocuments: async (
    id: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(
      `/api/attachments/${id}/review-required-documents${buildQueryString(params)}`,
    );
  },

  /** Create a new attachment. */
  create: async (
    request: CreateAttachmentRequest,
  ): Promise<ApiResult<Attachment>> => {
    return client.post("/api/attachments", request);
  },

  /** Update an existing attachment. */
  update: async (
    id: number | string,
    request: UpdateAttachmentRequest,
  ): Promise<ApiResult<Attachment>> => {
    return client.put(`/api/attachments/${id}`, request);
  },

  /** Check out the attachment so the caller can upload a new version. */
  checkout: async (id: number | string): Promise<ApiResult<Attachment>> => {
    return client.post(`/api/attachments/${id}/checkout`, {});
  },

  /** Release a checkout without uploading a new version. */
  cancelCheckout: async (id: number | string): Promise<ApiResult<Attachment>> => {
    return client.post(`/api/attachments/${id}/cancel-checkout`, {});
  },

  /** Search attachments using the PM search-tree grammar. */
  search: async (
    request: AttachmentSearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Attachment, "Attachment">>> => {
    return client.post(
      `/api/attachments/search${buildQueryString(params)}`,
      request,
    );
  },

  /** Permanently delete an attachment. */
  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/attachments/${id}`);
  },
});
