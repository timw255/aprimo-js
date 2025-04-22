import { QueryParams } from "../../model/QueryParams";
import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { buildHeaders } from "../../utils";

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

export interface User {
  id: string;
  username: string;
  email: string;
}

export const users = (client: HttpClient) => ({
  get: async (
    params?: QueryParams,
  ): Promise<ApiResult<PagedCollection<User>>> => {
    const headers = buildHeaders(params);
    
    return await client.get("/api/core/users", headers);
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
});
