import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { UserRole } from "../../../model/productivity/UserRole";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

/** Payload for `userRoles.create`. */
export interface CreateUserRoleRequest {
  /** Display name. */
  name: string;
  /** Long-form description. */
  description?: string;
  /** Active flag. */
  activeFlag?: number;
  /** Currency code id used for labor-rate fields. */
  currencyCode?: number;
  /** Labor-rate base (cost per hour, in `currencyCode`). */
  laborRateBase?: number;
  /** Whether to exclude from chatboard mentions. */
  excludeFromChatboards?: number;
  /** Whether the role is selectable in annotations. */
  usedInAnnotations?: number;
  /** Hex color used to badge the role in the UI. */
  color?: string;
  /** Initial user members. */
  users?: { userId: number }[];
  /** Initial group members. */
  groups?: { userId: number }[];
}

/** Payload for `userRoles.update`. */
export type UpdateUserRoleRequest = Partial<CreateUserRoleRequest>;

/**
 * Tenant user roles — named bundles of capability/labor-rate that get
 * assigned to users either directly or via groups. Distinct from
 * activity-scoped {@link activityRoles}.
 */
export const userRoles = (client: HttpClient) => ({
  /** List user roles. */
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<UserRole, "user-role" | "user-roles">>> => {
    return client.get(`/api/user-roles${buildQueryString(params)}`);
  },

  /** Fetch a single role by id. */
  getById: async (id: number | string): Promise<ApiResult<UserRole>> => {
    return client.get(`/api/user-roles/${id}`);
  },

  /**
   * Return roles eligible to be used in DAM-/PM-side annotations.
   * Specialized list — narrower than `get`.
   */
  getAnnotationUserRoles: async (): Promise<ApiResult<UserRole[]>> => {
    return client.get("/api/user-roles/annotationUserRoles");
  },

  /**
   * List the role memberships for a project. The response is keyed under
   * `_embedded.role-membership` / `role-memberships` and surfaces the
   * `UserRole` shape augmented with project-context membership.
   */
  getProjectRoleMemberships: async (
    projectId: number | string,
  ): Promise<ApiResult<PmPagedCollection<UserRole, "role-membership" | "role-memberships">>> => {
    return client.get(`/api/projects/${projectId}/role-memberships`);
  },

  /** Create a new role. */
  create: async (request: CreateUserRoleRequest): Promise<ApiResult<UserRole>> => {
    return client.post("/api/user-roles", request);
  },

  /** Update an existing role. */
  update: async (
    id: number | string,
    request: UpdateUserRoleRequest,
  ): Promise<ApiResult<UserRole>> => {
    return client.put(`/api/user-roles/${id}`, request);
  },

  /** Permanently delete a role. */
  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/user-roles/${id}`);
  },
});
