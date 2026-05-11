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
  /**
   * List users in the tenant. Returns one page; use `getPaged` for full
   * traversal, or `getById` for a single item.
   *
   * @example
   * ```ts
   * const res = await aprimo.users.get({ pageSize: 50 });
   * ```
   */
  get: async (
    params?: QueryParams,
  ): Promise<ApiResult<PagedCollection<User>>> => {
    const headers = buildHeaders(params);

    return await client.get("/api/core/users", headers);
  },

  /**
   * Async generator yielding pages of users. Wraps `get` and follows
   * `_links.next` until exhausted.
   *
   * @example
   * ```ts
   * const all: User[] = [];
   *
   * for await (const pageResult of aprimo.users.getPaged({ pageSize: 1000 })) {
   *   all.push(...(pageResult.data?.items ?? []));
   * }
   *
   * console.log("User count:", all.length);
   * ```
   */
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

  /**
   * Fetch a single user by id. Failure (e.g., not found) surfaces as
   * `ok: false` with the HTTP status on `ApiResult`.
   */
  getById: async (id: string): Promise<ApiResult<User>> => {
    return client.get(`/api/core/user/${id}`);
  },

  /**
   * Create a user.
   *
   * @example
   * ```ts
   * const res = await aprimo.users.create({
   *   name: "Jane Doe",
   *   email: "jane@example.com",
   * });
   * ```
   */
  create: async (request: CreateUserRequest): Promise<ApiResult<User>> => {
    return client.post("/api/core/users", request);
  },

  /**
   * Update a user.
   */
  update: async (
    id: string,
    request: UpdateUserRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/user/${id}`, request);
  },

  /**
   * Permanently delete a user.
   */
  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/user/${id}`);
  },

  /**
   * Read the effective permissions for a user.
   */
  getPermissions: async (
    id: string,
  ): Promise<ApiResult<PermissionValueCollection>> => {
    return client.get(`/api/core/user/${id}/permissions`);
  },

  /**
   * Update permissions assigned to a user.
   *
   * @example
   * ```ts
   * await aprimo.users.updatePermissions(userId, {
   *   permissions: { addOrUpdate: [{ name: "EditRecords", value: "granted" }] },
   * });
   * ```
   */
  updatePermissions: async (
    id: string,
    request: UpdatePermissionsRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/user/${id}/permissions`, request);
  },
});
