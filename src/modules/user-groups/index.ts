import { UserGroup } from "../../model/UserGroup";
import { QueryParams } from "../../model/QueryParams";
import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { buildHeaders } from "../../utils";

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

  update: async (
    userGroupId: string,
    request: UpdateUserGroupRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/usergroup/${userGroupId}`, request);
  },
});
