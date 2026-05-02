import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Task } from "../../../model/productivity/Task";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { PmSearchRequest } from "../../../model/productivity/PmSearchRequest";
import { buildQueryString } from "../../../utils";

export interface CreateSimpleTaskRequest {
  name: string;
  description?: string;
  beginDate?: string;
  endDate?: string;
  duration?: number;
  ownerId?: number;
  assignedTo?: number;
  projectId?: number;
  [key: string]: unknown;
}

export interface UpdateTaskRequest {
  name?: string;
  description?: string;
  beginDate?: string;
  endDate?: string;
  duration?: number;
  status?: number;
  [key: string]: unknown;
}

export type TaskSearchRequest = PmSearchRequest;

export interface DelegateTaskRequest {
  taskAssigneeId: number;
  newUserId: number;
}

export const tasks = (client: HttpClient) => ({
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Task, "task" | "tasks">>> => {
    return client.get(`/api/tasks${buildQueryString(params)}`);
  },

  getMine: async (
    status: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Task, "task" | "tasks">>> => {
    const merged = { status, ...(params ?? {}) };
    return client.get(`/api/tasks/mine${buildQueryString(merged)}`);
  },

  getById: async (id: number | string): Promise<ApiResult<Task>> => {
    return client.get(`/api/tasks/${id}`);
  },

  getDocumentAttachments: async (
    id: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(`/api/tasks/${id}/documents/attachments`);
  },

  getDocumentAssets: async (
    id: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(`/api/tasks/${id}/documents/assets`);
  },

  getDocuments: async (
    id: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(`/api/tasks/${id}/documents`);
  },

  getDocumentUploads: async (
    id: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(`/api/tasks/${id}/document-uploads`);
  },

  getDocumentUpload: async (
    id: number | string,
    documentId: number | string,
  ): Promise<ApiResult<unknown>> => {
    return client.get(`/api/tasks/${id}/document-uploads/${documentId}`);
  },

  getDocumentVersions: async (
    id: number | string,
    documentId: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(
      `/api/tasks/${id}/document-uploads/${documentId}/document-versions`,
    );
  },

  getDocumentVersion: async (
    id: number | string,
    documentId: number | string,
    versionId: number | string,
  ): Promise<ApiResult<unknown>> => {
    return client.get(
      `/api/tasks/${id}/document-uploads/${documentId}/document-versions/${versionId}`,
    );
  },

  getAssignees: async (
    id: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(`/api/tasks/${id}/assignees`);
  },

  getWorkingDigitalAssets: async (
    id: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(`/api/tasks/${id}/working-digital-assets`);
  },

  getWorkingDigitalAsset: async (
    id: number | string,
    documentId: number | string,
  ): Promise<ApiResult<unknown>> => {
    return client.get(`/api/tasks/${id}/working-digital-assets/${documentId}`);
  },

  getWorkingAttachments: async (
    id: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(`/api/tasks/${id}/working-attachments`);
  },

  getWorkingAttachment: async (
    id: number | string,
    documentId: number | string,
  ): Promise<ApiResult<unknown>> => {
    return client.get(`/api/tasks/${id}/working-attachments/${documentId}`);
  },

  getDocumentVotes: async (
    id: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(`/api/tasks/${id}/document-votes`);
  },

  getReviewMaterials: async (
    id: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(`/api/tasks/${id}/review-materials`);
  },

  createSimpleTask: async (
    request: CreateSimpleTaskRequest,
  ): Promise<ApiResult<Task>> => {
    return client.post("/api/tasks/simple-tasks", request);
  },

  update: async (
    id: number | string,
    request: UpdateTaskRequest,
  ): Promise<ApiResult<Task>> => {
    return client.put(`/api/tasks/${id}/`, request);
  },

  updateBeginDate: async (
    id: number | string,
    request: { beginDate: string },
  ): Promise<ApiResult<Task>> => {
    return client.put(`/api/tasks/begin-date/${id}/`, request);
  },

  updateEndDate: async (
    id: number | string,
    request: { endDate: string },
  ): Promise<ApiResult<Task>> => {
    return client.put(`/api/tasks/end-date/${id}/`, request);
  },

  updateDuration: async (
    id: number | string,
    request: { duration: number },
  ): Promise<ApiResult<Task>> => {
    return client.put(`/api/tasks/duration/${id}/`, request);
  },

  delegate: async (
    id: number | string,
    request: DelegateTaskRequest,
  ): Promise<ApiResult<void>> => {
    return client.post(`/api/tasks/${id}/delegate`, request);
  },

  accept: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/tasks/${id}/accept`, {});
  },

  close: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/tasks/${id}/close`, {});
  },

  decline: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/tasks/${id}/decline`, {});
  },

  search: async (
    request: TaskSearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Task, "task" | "tasks">>> => {
    return client.post(`/api/tasks/search${buildQueryString(params)}`, request);
  },

  uploadDocumentAttachment: async (
    taskId: number | string,
    taskDocumentId: number | string,
    request: unknown,
  ): Promise<ApiResult<unknown>> => {
    return client.post(
      `/api/tasks/${taskId}/document-uploads/${taskDocumentId}/attachments`,
      request,
    );
  },

  uploadDocumentAttachmentVersion: async (
    taskId: number | string,
    taskDocumentId: number | string,
    attachmentId: number | string,
    request: unknown,
  ): Promise<ApiResult<unknown>> => {
    return client.post(
      `/api/tasks/${taskId}/document-uploads/${taskDocumentId}/attachments/${attachmentId}/versions`,
      request,
    );
  },

  uploadDocument: async (
    taskId: number | string,
    documentId: number | string,
    request: { versionId: number | string },
  ): Promise<ApiResult<void>> => {
    return client.put(
      `/api/tasks/${taskId}/document-uploads/${documentId}/upload-document`,
      request,
    );
  },

  deleteUploadedVersion: async (
    taskId: number | string,
    documentId: number | string,
    versionId: number | string,
  ): Promise<ApiResult<void>> => {
    return client.delete(
      `/api/tasks/${taskId}/document-uploads/${documentId}/uploaded-versions/${versionId}`,
    );
  },
});
