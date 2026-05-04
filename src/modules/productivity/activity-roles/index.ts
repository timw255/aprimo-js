import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import {
  ActivityRole,
  ActivityRoleMember,
} from "../../../model/productivity/ActivityRole";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export interface CreateActivityRoleRequest {
  userRoleId: number;
  users?: ActivityRoleMember[];
  userTokens?: ActivityRoleMember[];
}

export type UpdateActivityRoleRequest = Partial<CreateActivityRoleRequest>;

export interface AddActivityRoleMembersRequest {
  users?: ActivityRoleMember[];
  userTokens?: ActivityRoleMember[];
}

export const activityRoles = (client: HttpClient) => ({
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

  create: async (
    activityId: number | string,
    request: CreateActivityRoleRequest,
  ): Promise<ApiResult<ActivityRole>> => {
    return client.post(`/api/activities/${activityId}/roles`, request);
  },

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

  delete: async (
    activityId: number | string,
    activityRoleId: number | string,
  ): Promise<ApiResult<void>> => {
    return client.delete(`/api/activities/${activityId}/roles/${activityRoleId}`);
  },

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
