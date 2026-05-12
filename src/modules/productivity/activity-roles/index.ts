import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import {
  ActivityRole,
  ActivityRoleMember,
} from "../../../model/productivity/ActivityRole";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

/** Payload for `activityRoles.create`. */
export interface CreateActivityRoleRequest {
  /** Underlying tenant user-role id this activity-role is bound to. */
  userRoleId: number;
  /** Direct user assignments. */
  users?: ActivityRoleMember[];
  /** User-token assignments (alias references). */
  userTokens?: ActivityRoleMember[];
}

/** Payload for `activityRoles.update`. */
export type UpdateActivityRoleRequest = Partial<CreateActivityRoleRequest>;

/** Payload for `activityRoles.addMembers`. */
export interface AddActivityRoleMembersRequest {
  /** Users to add to the role. */
  users?: ActivityRoleMember[];
  /** User-token members to add. */
  userTokens?: ActivityRoleMember[];
}

/**
 * Activity roles — per-activity bindings of a tenant `UserRole` to one or
 * more users. Roles control who can act on the activity in what capacity
 * (e.g., reviewer, approver).
 */
export const activityRoles = (client: HttpClient) => ({
  /** List the roles defined on an activity. */
  getByActivityId: async (
    activityId: number | string,
    params?: PmQueryParams,
  ): Promise<
    ApiResult<PmPagedCollection<ActivityRole, "activity-role">>
  > => {
    return client.get(
      `/api/activities/${activityId}/roles${buildQueryString(params)}`,
    );
  },

  /**
   * Attach a role to an activity, optionally with initial members.
   *
   * @example
   * ```ts
   * await aprimo.productivity.activityRoles.create(501, {
   *   userRoleId: 9944,
   *   users: [{ id: 1234 }],
   * });
   * ```
   */
  create: async (
    activityId: number | string,
    request: CreateActivityRoleRequest,
  ): Promise<ApiResult<ActivityRole>> => {
    return client.post(`/api/activities/${activityId}/roles`, request);
  },

  /** Update an existing activity role (e.g., swap members). */
  update: async (
    activityId: number | string,
    activityRoleId: number | string,
    request: UpdateActivityRoleRequest,
  ): Promise<ApiResult<ActivityRole>> => {
    return client.put(
      `/api/activities/${activityId}/roles/${activityRoleId}`,
      request,
    );
  },

  /** Remove a role from an activity. */
  delete: async (
    activityId: number | string,
    activityRoleId: number | string,
  ): Promise<ApiResult<void>> => {
    return client.delete(`/api/activities/${activityId}/roles/${activityRoleId}`);
  },

  /**
   * Add members to an existing role on an activity. Use this rather than
   * `update` when you only need to extend membership without rewriting the
   * full role payload.
   */
  addMembers: async (
    activityId: number | string,
    activityRoleId: number | string,
    request: AddActivityRoleMembersRequest,
  ): Promise<ApiResult<ActivityRole>> => {
    return client.post(
      `/api/activities/${activityId}/roles/${activityRoleId}/members`,
      request,
    );
  },

  /** Remove a single member from a role on an activity. */
  removeMember: async (
    activityId: number | string,
    activityRoleId: number | string,
    memberId: number | string,
  ): Promise<ApiResult<void>> => {
    return client.delete(
      `/api/activities/${activityId}/roles/${activityRoleId}/members/${memberId}`,
    );
  },
});
