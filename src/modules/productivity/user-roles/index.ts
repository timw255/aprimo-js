import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { UserRole } from "../../../model/productivity/UserRole";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export interface CreateUserRoleRequest {
  name: string;
  description?: string;
  activeFlag?: number;
  currencyCode?: number;
  laborRateBase?: number;
  excludeFromChatboards?: number;
  usedInAnnotations?: number;
  color?: string;
  users?: { userId: number }[];
  groups?: { userId: number }[];
}

export type UpdateUserRoleRequest = Partial<CreateUserRoleRequest>;

export const userRoles = (client: HttpClient) => ({
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<UserRole, "user-role" | "user-roles">>> => {
    return client.get(`/api/user-roles${buildQueryString(params)}`);
  },

  getById: async (id: number | string): Promise<ApiResult<UserRole>> => {
    return client.get(`/api/user-roles/${id}`);
  },

  getAnnotationUserRoles: async (): Promise<ApiResult<UserRole[]>> => {
    return client.get("/api/user-roles/annotationUserRoles");
  },

  getProjectRoleMemberships: async (
    projectId: number | string,
  ): Promise<ApiResult<PmPagedCollection<UserRole, "role-membership" | "role-memberships">>> => {
    return client.get(`/api/projects/${projectId}/role-memberships`);
  },

  create: async (request: CreateUserRoleRequest): Promise<ApiResult<UserRole>> => {
    return client.post("/api/user-roles", request);
  },

  update: async (
    id: number | string,
    request: UpdateUserRoleRequest,
  ): Promise<ApiResult<UserRole>> => {
    return client.put(`/api/user-roles/${id}`, request);
  },

  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/user-roles/${id}`);
  },
});
