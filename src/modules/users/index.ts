import { QueryParams } from "../../model/QueryParams";
import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { PermissionValueCollection } from "../../model/PermissionValueCollection";
import { SetActions } from "../../model/SetActions";
import { buildHeaders } from "../../utils";
import { User } from "../../model";

export interface PermissionUpdate {
  name: string;
  value: "granted" | "denied" | "notset";
}

export interface UpdatePermissionsRequest {
  permissions: SetActions<PermissionUpdate>;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface UpdateUserRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
}

export const users = (client: HttpClient) => ({
  get: async (
    params?: QueryParams,
  ): Promise<ApiResult<PagedCollection<User>>> => {
    const headers = buildHeaders(params);

    return await client.get("/api/core/users", headers);
  },

  getPaged: async function* (
    params: QueryParams = {},
  ): AsyncGenerator<ApiResult<PagedCollection<User>>, void, unknown> {
    let currentPage = params.page ?? 1;
    const pageSize = params.pageSize ?? 100;

    while (true) {
      const result = await this.get({ ...params, page: currentPage, pageSize });

      yield result;

      if (!result.ok || !result.data?._links?.next) break;

      currentPage++;
    }
  },

  getById: async (id: string): Promise<ApiResult<User>> => {
    return client.get(`/api/core/user/${id}`);
  },

  create: async (request: CreateUserRequest): Promise<ApiResult<User>> => {
    return client.post("/api/core/users", request);
  },

  update: async (
    id: string,
    request: UpdateUserRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/user/${id}`, request);
  },

  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/user/${id}`);
  },

  getPermissions: async (
    id: string,
  ): Promise<ApiResult<PermissionValueCollection>> => {
    return client.get(`/api/core/user/${id}/permissions`);
  },

  updatePermissions: async (
    id: string,
    request: UpdatePermissionsRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/user/${id}/permissions`, request);
  },
});
