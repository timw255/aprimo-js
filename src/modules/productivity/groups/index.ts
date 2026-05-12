import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Group, GroupDomainRights } from "../../../model/productivity/Group";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { PmSearchRequest } from "../../../model/productivity/PmSearchRequest";
import { buildQueryString } from "../../../utils";

/** Payload for `groups.create`. */
export interface CreateGroupRequest {
  /** Display name. */
  name: string;
  /** Status id (typically active/inactive). */
  status?: number;
  /** Whether the group is treated as a finance group. */
  financeGroup: number;
  /** Long-form description. */
  description?: string;
  /** ADAM (legacy DAM) user id for cross-system mapping. */
  adamUserId?: string;
  /** Initial user members. */
  users?: { userId: number }[];
  /** Initial role assignments. */
  roles?: { roleId: number }[];
  /** Domain-rights grants (function ids scoped to security domains). */
  domainRights: GroupDomainRights[];
}

/** Payload for `groups.update`. */
export type UpdateGroupRequest = Partial<CreateGroupRequest>;

/** Search payload — uses the generic PM search-tree grammar. */
export type GroupSearchRequest = PmSearchRequest;

/**
 * PM user groups — named collections of users that carry rights and roles.
 * Membership is enumerated via {@link groupMemberships}.
 */
export const groups = (client: HttpClient) => ({
  /** List groups. */
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Group, "group">>> => {
    return client.get(`/api/groups${buildQueryString(params)}`);
  },

  /** Fetch a single group by id. */
  getById: async (id: number | string): Promise<ApiResult<Group>> => {
    return client.get(`/api/groups/${id}`);
  },

  /** Create a new group. */
  create: async (request: CreateGroupRequest): Promise<ApiResult<Group>> => {
    return client.post("/api/groups", request);
  },

  /** Update an existing group. */
  update: async (
    id: number | string,
    request: UpdateGroupRequest,
  ): Promise<ApiResult<Group>> => {
    return client.put(`/api/groups/${id}`, request);
  },

  /**
   * Search groups using the PM search-tree grammar.
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.groups.search({
   *   contains: { fieldName: "name", fieldValue: "Finance" },
   * });
   * ```
   */
  search: async (
    request: GroupSearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Group, "group">>> => {
    return client.post(`/api/groups/search${buildQueryString(params)}`, request);
  },

  /** Permanently delete a group. */
  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/groups/${id}`);
  },
});
