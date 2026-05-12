import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Task } from "../../../model/productivity/Task";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { PmSearchRequest } from "../../../model/productivity/PmSearchRequest";
import { buildQueryString } from "../../../utils";

/** Payload for `tasks.createSimpleTask`. */
export interface CreateSimpleTaskRequest {
  /** Display name. */
  name: string;
  /** Long-form description. */
  description?: string;
  /** Start date. */
  beginDate?: string;
  /** End date. */
  endDate?: string;
  /** Duration in working days. */
  duration?: number;
  /** PM user id of the owner. */
  ownerId?: number;
  /** PM user id of the primary assignee. */
  assignedTo?: number;
  /** Parent project id. */
  projectId?: number;
  /** Open-ended additional fields per tenant config. */
  [key: string]: unknown;
}

/** Payload for `tasks.update`. */
export interface UpdateTaskRequest {
  /** Display name. */
  name?: string;
  /** Long-form description. */
  description?: string;
  /** Start date. */
  beginDate?: string;
  /** End date. */
  endDate?: string;
  /** Duration in working days. */
  duration?: number;
  /** Workflow state id. */
  status?: number;
  /** Open-ended additional fields per tenant config. */
  [key: string]: unknown;
}

/** Search payload — uses the generic PM search-tree grammar. */
export type TaskSearchRequest = PmSearchRequest;

/** Payload for `tasks.delegate`. */
export interface DelegateTaskRequest {
  /** Current assignee id being replaced. */
  taskAssigneeId: number;
  /** PM user id of the new assignee. */
  newUserId: number;
}

/**
 * PM tasks. Covers the task lifecycle (accept / decline / close /
 * delegate), date adjustments, document-upload management, and asset/
 * attachment introspection.
 */
export const tasks = (client: HttpClient) => ({
  /** List all tasks visible to the caller. */
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Task, "Task">>> => {
    return client.get(`/api/tasks${buildQueryString(params)}`);
  },

  /**
   * List tasks assigned to the calling user, filtered by status.
   *
   * @param status - Status id to filter on (forwarded as a query param).
   */
  getMine: async (
    status: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Task, "Task">>> => {
    const merged = { status, ...(params ?? {}) };
    return client.get(`/api/tasks/mine${buildQueryString(merged)}`);
  },

  /** Fetch a single task by id. */
  getById: async (id: number | string): Promise<ApiResult<Task>> => {
    return client.get(`/api/tasks/${id}`);
  },

  /** List all attachments attached to the task's documents. */
  getDocumentAttachments: async (
    id: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(`/api/tasks/${id}/documents/attachments`);
  },

  /** List the digital assets attached to the task's documents. */
  getDocumentAssets: async (
    id: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(`/api/tasks/${id}/documents/assets`);
  },

  /** List the documents attached to the task. */
  getDocuments: async (
    id: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(`/api/tasks/${id}/documents`);
  },

  /** List the document-upload slots on the task. */
  getDocumentUploads: async (
    id: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(`/api/tasks/${id}/document-uploads`);
  },

  /** Fetch a single document-upload slot. */
  getDocumentUpload: async (
    id: number | string,
    documentId: number | string,
  ): Promise<ApiResult<unknown>> => {
    return client.get(`/api/tasks/${id}/document-uploads/${documentId}`);
  },

  /** List the versions on a document-upload slot. */
  getDocumentVersions: async (
    id: number | string,
    documentId: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(
      `/api/tasks/${id}/document-uploads/${documentId}/document-versions`,
    );
  },

  /** Fetch a single document version. */
  getDocumentVersion: async (
    id: number | string,
    documentId: number | string,
    versionId: number | string,
  ): Promise<ApiResult<unknown>> => {
    return client.get(
      `/api/tasks/${id}/document-uploads/${documentId}/document-versions/${versionId}`,
    );
  },

  /** List the assignees on a task. */
  getAssignees: async (
    id: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(`/api/tasks/${id}/assignees`);
  },

  /** List the working (in-progress) digital assets on the task. */
  getWorkingDigitalAssets: async (
    id: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(`/api/tasks/${id}/working-digital-assets`);
  },

  /** Fetch a single working digital asset by id. */
  getWorkingDigitalAsset: async (
    id: number | string,
    documentId: number | string,
  ): Promise<ApiResult<unknown>> => {
    return client.get(`/api/tasks/${id}/working-digital-assets/${documentId}`);
  },

  /** List the working (in-progress) attachments on the task. */
  getWorkingAttachments: async (
    id: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(`/api/tasks/${id}/working-attachments`);
  },

  /** Fetch a single working attachment by id. */
  getWorkingAttachment: async (
    id: number | string,
    documentId: number | string,
  ): Promise<ApiResult<unknown>> => {
    return client.get(`/api/tasks/${id}/working-attachments/${documentId}`);
  },

  /** List the votes cast on the task's documents (review tasks). */
  getDocumentVotes: async (
    id: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(`/api/tasks/${id}/document-votes`);
  },

  /** List the review materials assembled for the task. */
  getReviewMaterials: async (
    id: number | string,
  ): Promise<ApiResult<PmPagedCollection<unknown>>> => {
    return client.get(`/api/tasks/${id}/review-materials`);
  },

  /**
   * Create a simple task.
   *
   * @example
   * ```ts
   * await aprimo.productivity.tasks.createSimpleTask({
   *   name: "Send draft to legal",
   *   projectId: 9999,
   *   assignedTo: 1234,
   * });
   * ```
   */
  createSimpleTask: async (
    request: CreateSimpleTaskRequest,
  ): Promise<ApiResult<Task>> => {
    return client.post("/api/tasks/simple-tasks", request);
  },

  /** Update task fields. */
  update: async (
    id: number | string,
    request: UpdateTaskRequest,
  ): Promise<ApiResult<Task>> => {
    return client.put(`/api/tasks/${id}/`, request);
  },

  /** Update only the task's start date (dedicated endpoint for resequencing). */
  updateBeginDate: async (
    id: number | string,
    request: { beginDate: string },
  ): Promise<ApiResult<Task>> => {
    return client.put(`/api/tasks/begin-date/${id}/`, request);
  },

  /** Update only the task's end date. */
  updateEndDate: async (
    id: number | string,
    request: { endDate: string },
  ): Promise<ApiResult<Task>> => {
    return client.put(`/api/tasks/end-date/${id}/`, request);
  },

  /** Update only the task's duration. */
  updateDuration: async (
    id: number | string,
    request: { duration: number },
  ): Promise<ApiResult<Task>> => {
    return client.put(`/api/tasks/duration/${id}/`, request);
  },

  /**
   * Delegate a task assignment from one user to another.
   *
   * @example
   * ```ts
   * await aprimo.productivity.tasks.delegate(taskId, {
   *   taskAssigneeId: 1234,
   *   newUserId: 5678,
   * });
   * ```
   */
  delegate: async (
    id: number | string,
    request: DelegateTaskRequest,
  ): Promise<ApiResult<void>> => {
    return client.post(`/api/tasks/${id}/delegate`, request);
  },

  /** Accept a task assignment. */
  accept: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/tasks/${id}/accept`, {});
  },

  /** Close a task (completed/dismissed). */
  close: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/tasks/${id}/close`, {});
  },

  /** Decline a task assignment. */
  decline: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/tasks/${id}/decline`, {});
  },

  /** Search tasks using the PM search-tree grammar. */
  search: async (
    request: TaskSearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Task, "Task">>> => {
    return client.post(`/api/tasks/search${buildQueryString(params)}`, request);
  },

  /** Upload an attachment to a task's document-upload slot. */
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

  /** Upload a new version of an attachment on a task's document. */
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

  /**
   * Finalize an uploaded document by binding it to a specific version on
   * a task's document-upload slot.
   */
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

  /** Delete a single uploaded version from a task's document-upload slot. */
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
