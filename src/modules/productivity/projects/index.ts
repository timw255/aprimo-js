import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Attachment } from "../../../model/productivity/Attachment";
import { DigitalAsset } from "../../../model/productivity/DigitalAsset";
import { Project } from "../../../model/productivity/Project";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

/** Payload for `projects.create`. */
export interface CreateProjectRequest {
  /** Display title. */
  title: string;
  /** Parent activity id, if the project rolls up under one. */
  activityId?: number;
  /** Long-form description. */
  description?: string;
  /** Start date. */
  beginDate?: string;
  /** End date. */
  endDate?: string;
  /** Workflow definition id this project runs under. */
  workflowId?: number;
  /** Project workflow state id. */
  projectStatus?: number;
  /** PM user id of the project manager. */
  projectManager?: number;
  /** "As late as possible" scheduling flag. */
  enableAlap?: number;
  /** Time-zone id. */
  timeZoneId?: number;
  /** Scaling-mode id controlling how durations stretch when dates change. */
  projectScalingTypeId?: number;
  /** Default location id for digital assets produced by the project. */
  digitalAssetLocation?: number;
  /** Whether the project is a change order (`true`/`false`). */
  changeOrder?: boolean;
  /** Whether to honor the DAM-side asset access list. */
  useDamAssetAccessList?: number;
  /** Whether to allow tasks to float beyond their planned dates. */
  useFloat?: number;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
}

/** Payload for `projects.update`. */
export type UpdateProjectRequest = Partial<CreateProjectRequest>;

/** Payload for `projects.createProjectRole`. */
export interface CreateProjectRoleRequest {
  /** Underlying tenant user-role id. */
  userRoleId: number;
  /** Direct user members. */
  users?: { id: number }[];
  /** User-token members. */
  userTokens?: { id: number }[];
}

/** Payload for `projects.linkAttachment`. Open-ended — server-defined extras. */
export interface ProjectAttachmentLinkRequest {
  [key: string]: unknown;
}

/**
 * PM projects — execution containers (workflow + tasks + assets) that
 * deliver activities. Each project has its own workflow, scheduling
 * options, role membership, and asset/attachment links.
 */
export const projects = (client: HttpClient) => ({
  /** List projects. */
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Project, "Project">>> => {
    return client.get(`/api/projects${buildQueryString(params)}`);
  },

  /** Fetch a single project by id. */
  getById: async (id: number | string): Promise<ApiResult<Project>> => {
    return client.get(`/api/projects/${id}`);
  },

  /** List the projects rolled up under an activity. */
  getByActivityId: async (
    activityId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Project, "Project">>> => {
    return client.get(
      `/api/activities/${activityId}/projects${buildQueryString(params)}`,
    );
  },

  /** List the attachments linked to a project. */
  getAttachments: async (
    projectId: number | string,
    params?: PmQueryParams,
  ): Promise<
    ApiResult<PmPagedCollection<Attachment, "Attachment">>
  > => {
    return client.get(
      `/api/projects/${projectId}/attachments${buildQueryString(params)}`,
    );
  },

  /** List the digital assets linked to a project. */
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

  /** List the user members of a project role. */
  getProjectRoleMembers: async (
    projectId: number | string,
    projectRoleId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<unknown, string>>> => {
    return client.get(
      `/api/projects/${projectId}/project-roles/${projectRoleId}/members${buildQueryString(params)}`,
    );
  },

  /** Create a new project. */
  create: async (request: CreateProjectRequest): Promise<ApiResult<Project>> => {
    return client.post("/api/projects", request);
  },

  /** Update an existing project. */
  update: async (
    id: number | string,
    request: UpdateProjectRequest,
  ): Promise<ApiResult<Project>> => {
    return client.put(`/api/projects/${id}`, request);
  },

  /** Transition the project's workflow into a running state. */
  start: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/projects/${id}/start`, {});
  },

  /** Cancel the project. */
  cancel: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/projects/${id}/cancel`, {});
  },

  /** Close the project (typically used after successful completion). */
  close: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/projects/${id}/close`, {});
  },

  /** Pause a running project. */
  pause: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/projects/${id}/pause`, {});
  },

  /**
   * Attach a role (with optional members) to a project. To later add or
   * remove individual members, use {@link addProjectRoleMembers}.
   */
  createProjectRole: async (
    id: number | string,
    request: CreateProjectRoleRequest,
  ): Promise<ApiResult<unknown>> => {
    return client.post(`/api/projects/${id}/project-roles`, request);
  },

  /** Add members to an existing role on a project. */
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

  /**
   * Link an existing attachment to a project. The optional `request` body
   * is server-defined and typically empty — pass `{}` unless your tenant
   * requires extras.
   */
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
