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
  /**
   * List user groups. Returns one page; use `getPaged` for full traversal,
   * or `getById` for a single item.
   *
   * @example
   * ```ts
   * const res = await aprimo.userGroups.get();
   * ```
   */
  get: async (
    params?: QueryParams,
  ): Promise<ApiResult<PagedCollection<UserGroup>>> => {
    const headers = buildHeaders(params);

    return await client.get("/api/core/usergroups", headers);
  },

  /**
   * Fetch a single user group by id. Failure (e.g., not found) surfaces as
   * `ok: false` with the HTTP status on `ApiResult`.
   */
  getById: async (userGroupId: string): Promise<ApiResult<UserGroup>> => {
    return client.get(`/api/core/usergroup/${userGroupId}`);
  },

  /**
   * Async generator yielding pages of user groups. Wraps `get` and follows
   * `_links.next` until exhausted.
   *
   * @example
   * ```ts
   * const all: UserGroup[] = [];
   *
   * for await (const pageResult of aprimo.userGroups.getPaged({ pageSize: 1000 })) {
   *   all.push(...(pageResult.data?.items ?? []));
   * }
   *
   * console.log("User group count:", all.length);
   * ```
   */
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

  /**
   * Create a user group.
   *
   * @example
   * ```ts
   * const res = await aprimo.userGroups.create({ name: "Editors" });
   * ```
   */
  create: async (
    request: CreateUserGroupRequest,
  ): Promise<ApiResult<CreateUserGroupResponse>> => {
    return client.post("/api/core/usergroups", request);
  },

  /**
   * Update a user group.
   */
  update: async (
    userGroupId: string,
    request: UpdateUserGroupRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/usergroup/${userGroupId}`, request);
  },

  /**
   * Permanently delete a user group.
   */
  delete: async (userGroupId: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/usergroup/${userGroupId}`);
  },

  /**
   * Read the effective permissions assigned to a user group.
   */
  getPermissions: async (
    userGroupId: string,
  ): Promise<ApiResult<PermissionValueCollection>> => {
    return client.get(`/api/core/usergroup/${userGroupId}/permissions`);
  },

  /**
   * Update the permissions assigned to a user group.
   *
   * @example
   * ```ts
   * await aprimo.userGroups.updatePermissions(userGroupId, {
   *   permissions: { addOrUpdate: [{ name: "EditRecords", value: "granted" }] },
   * });
   * ```
   */
  updatePermissions: async (
    userGroupId: string,
    request: UpdatePermissionsRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/usergroup/${userGroupId}/permissions`, request);
  },
});
