import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Activity } from "../../../model/productivity/Activity";
import { Attachment } from "../../../model/productivity/Attachment";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export interface CreateAttachmentRequest {
  title: string;
  objectId: number;
  objectTypeId: number;
  attachmentTypeId?: number;
  projectVisibility?: boolean;
  attachmentType?: string;
  creatorId?: number;
  customThumb?: number;
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  projects?: unknown[];
  activityProjectList?: number;
  sendNotification?: number;
}

export type UpdateAttachmentRequest = Partial<CreateAttachmentRequest>;

export interface AttachmentSearchRequest {
  equals?: { fieldName: string; fieldValue: string | number | boolean };
  [key: string]: unknown;
}

export const attachments = (client: HttpClient) => ({
  getById: async (id: number | string): Promise<ApiResult<Attachment>> => {
    return client.get(`/api/attachments/${id}`);
  },

  getByProjectId: async (
    projectId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Attachment, "attachment" | "attachments">>> => {
    return client.get(
      `/api/projects/${projectId}/attachments${buildQueryString(params)}`,
    );
  },

  getActivity: async (id: number | string): Promise<ApiResult<Activity>> => {
    return client.get(`/api/attachments/${id}/activity`);
  },

  getReviewRequiredDocuments: async (
    id: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(
      `/api/attachments/${id}/review-required-documents${buildQueryString(params)}`,
    );
  },

  create: async (
    request: CreateAttachmentRequest,
  ): Promise<ApiResult<Attachment>> => {
    return client.post("/api/attachments", request);
  },

  update: async (
    id: number | string,
    request: UpdateAttachmentRequest,
  ): Promise<ApiResult<Attachment>> => {
    return client.put(`/api/attachments/${id}`, request);
  },

  checkout: async (id: number | string): Promise<ApiResult<Attachment>> => {
    return client.post(`/api/attachments/${id}/checkout`, {});
  },

  cancelCheckout: async (id: number | string): Promise<ApiResult<Attachment>> => {
    return client.post(`/api/attachments/${id}/cancel-checkout`, {});
  },

  search: async (
    request: AttachmentSearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Attachment, "attachment" | "attachments">>> => {
    return client.post(
      `/api/attachments/search${buildQueryString(params)}`,
      request,
    );
  },

  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/attachments/${id}`);
  },
});
