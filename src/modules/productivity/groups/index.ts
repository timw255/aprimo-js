import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Group, GroupDomainRights } from "../../../model/productivity/Group";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { PmSearchRequest } from "../../../model/productivity/PmSearchRequest";
import { buildQueryString } from "../../../utils";

export interface CreateGroupRequest {
  name: string;
  status?: number;
  financeGroup: number;
  description?: string;
  adamUserId?: string;
  users?: { userId: number }[];
  roles?: { roleId: number }[];
  domainRights: GroupDomainRights[];
}

export type UpdateGroupRequest = Partial<CreateGroupRequest>;

export type GroupSearchRequest = PmSearchRequest;

export const groups = (client: HttpClient) => ({
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Group, "group">>> => {
    return client.get(`/api/groups${buildQueryString(params)}`);
  },

  getById: async (id: number | string): Promise<ApiResult<Group>> => {
    return client.get(`/api/groups/${id}`);
  },

  create: async (request: CreateGroupRequest): Promise<ApiResult<Group>> => {
    return client.post("/api/groups", request);
  },

  update: async (
    id: number | string,
    request: UpdateGroupRequest,
  ): Promise<ApiResult<Group>> => {
    return client.put(`/api/groups/${id}`, request);
  },

  search: async (
    request: GroupSearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Group, "group">>> => {
    return client.post(`/api/groups/search${buildQueryString(params)}`, request);
  },

  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/groups/${id}`);
  },
});
