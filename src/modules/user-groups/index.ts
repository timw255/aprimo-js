import { UserGroup } from "../../model/UserGroup";
import { QueryParams } from "../../model/QueryParams";
import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { PermissionValueCollection } from "../../model/PermissionValueCollection";
import { SetActions } from "../../model/SetActions";
import { buildHeaders } from "../../utils";

export interface PermissionUpdate {
  name: string;
  value: "granted" | "denied" | "notset";
}

export interface UpdatePermissionsRequest {
  permissions: SetActions<PermissionUpdate>;
}

export interface CreateUserGroupRequest {
  name: string;
  organizationId?: string;
  tag?: string;
}

export interface CreateUserGroupResponse {
  id: string;
}

export interface UpdateUserGroupRequest {
  name?: string;
  organizationId?: string;
  tag?: string | null;
}

export const userGroups = (client: HttpClient) => ({
  get: async (
    params?: QueryParams,
  ): Promise<ApiResult<PagedCollection<UserGroup>>> => {
    const headers = buildHeaders(params);

    return await client.get("/api/core/usergroups", headers);
  },

  getById: async (userGroupId: string): Promise<ApiResult<UserGroup>> => {
    return client.get(`/api/core/usergroup/${userGroupId}`);
  },

  getPaged: async function* (
    params: QueryParams = {},
  ): AsyncGenerator<ApiResult<PagedCollection<UserGroup>>, void, unknown> {
    let currentPage = params.page ?? 1;
    const pageSize = params.pageSize ?? 100;

    while (true) {
      const result = await this.get({ ...params, page: currentPage, pageSize });

      yield result;

      if (!result.ok || !result.data?._links?.next) break;

      currentPage++;
    }
  },

  create: async (
    request: CreateUserGroupRequest,
  ): Promise<ApiResult<CreateUserGroupResponse>> => {
    return client.post("/api/core/usergroups", request);
  },

  update: async (
    userGroupId: string,
    request: UpdateUserGroupRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/usergroup/${userGroupId}`, request);
  },

  delete: async (userGroupId: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/usergroup/${userGroupId}`);
  },

  getPermissions: async (
    userGroupId: string,
  ): Promise<ApiResult<PermissionValueCollection>> => {
    return client.get(`/api/core/usergroup/${userGroupId}/permissions`);
  },

  updatePermissions: async (
    userGroupId: string,
    request: UpdatePermissionsRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/usergroup/${userGroupId}/permissions`, request);
  },
});
