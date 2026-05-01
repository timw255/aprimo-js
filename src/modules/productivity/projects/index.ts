import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Attachment } from "../../../model/productivity/Attachment";
import { DigitalAsset } from "../../../model/productivity/DigitalAsset";
import { Project } from "../../../model/productivity/Project";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export interface CreateProjectRequest {
  title: string;
  activityId?: number;
  description?: string;
  beginDate?: string;
  endDate?: string;
  workflowId?: number;
  projectStatus?: number;
  projectManager?: number;
  enableAlap?: number;
  timeZoneId?: number;
  projectScalingTypeId?: number;
  digitalAssetLocation?: number;
  changeOrder?: boolean;
  useDamAssetAccessList?: number;
  useFloat?: number;
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
}

export type UpdateProjectRequest = Partial<CreateProjectRequest>;

export interface CreateProjectRoleRequest {
  userRoleId: number;
  users?: { id: number }[];
  userTokens?: { id: number }[];
}

export interface ProjectAttachmentLinkRequest {
  [key: string]: unknown;
}

export const projects = (client: HttpClient) => ({
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Project, "Project" | "project" | "projects">>> => {
    return client.get(`/api/projects${buildQueryString(params)}`);
  },

  getById: async (id: number | string): Promise<ApiResult<Project>> => {
    return client.get(`/api/projects/${id}`);
  },

  getByActivityId: async (
    activityId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Project, "Project" | "project" | "projects">>> => {
    return client.get(
      `/api/activities/${activityId}/projects${buildQueryString(params)}`,
    );
  },

  getAttachments: async (
    projectId: number | string,
    params?: PmQueryParams,
  ): Promise<
    ApiResult<PmPagedCollection<Attachment, "attachment" | "attachments">>
  > => {
    return client.get(
      `/api/projects/${projectId}/attachments${buildQueryString(params)}`,
    );
  },

  getDigitalAssets: async (
    projectId: number | string,
    params?: PmQueryParams,
  ): Promise<
    ApiResult<PmPagedCollection<DigitalAsset, "digital-asset" | "digital-assets">>
  > => {
    return client.get(
      `/api/projects/${projectId}/digital-assets${buildQueryString(params)}`,
    );
  },

  getProjectRoleMembers: async (
    projectId: number | string,
    projectRoleId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<unknown, string>>> => {
    return client.get(
      `/api/projects/${projectId}/project-roles/${projectRoleId}/members${buildQueryString(params)}`,
    );
  },

  create: async (request: CreateProjectRequest): Promise<ApiResult<Project>> => {
    return client.post("/api/projects", request);
  },

  update: async (
    id: number | string,
    request: UpdateProjectRequest,
  ): Promise<ApiResult<Project>> => {
    return client.put(`/api/projects/${id}`, request);
  },

  start: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/projects/${id}/start`, {});
  },

  cancel: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/projects/${id}/cancel`, {});
  },

  close: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/projects/${id}/close`, {});
  },

  pause: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/projects/${id}/pause`, {});
  },

  createProjectRole: async (
    id: number | string,
    request: CreateProjectRoleRequest,
  ): Promise<ApiResult<unknown>> => {
    return client.post(`/api/projects/${id}/project-roles`, request);
  },

  addProjectRoleMembers: async (
    projectId: number | string,
    projectRoleId: number | string,
    request: { users?: { id: number }[]; userTokens?: { id: number }[] },
  ): Promise<ApiResult<unknown>> => {
    return client.post(
      `/api/projects/${projectId}/project-roles/${projectRoleId}/members`,
      request,
    );
  },

  linkAttachment: async (
    projectId: number | string,
    attachmentId: number | string,
    request: ProjectAttachmentLinkRequest = {},
  ): Promise<ApiResult<unknown>> => {
    return client.post(
      `/api/projects/${projectId}/attachments/${attachmentId}`,
      request,
    );
  },
});
