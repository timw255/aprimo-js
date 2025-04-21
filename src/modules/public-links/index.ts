import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { PublicLink } from "../../model/PublicLink";

export interface CreatePublicLinkRequest {
  renditionName?: string;
  uri: string;
  provider: string;
  recordId?: string;
  fileSize?: number;
  fileVersionId?: string;
  additionalFileId?: string;
}

export interface UpdatePublicLinkRequest {
  renditionName?: string;
  uri?: string;
  provider?: string;
  fileSize?: number;
}

export const publicLinks = (client: HttpClient) => ({
  create: async (
    request: CreatePublicLinkRequest,
  ): Promise<ApiResult<PublicLink>> => {
    return client.post("/api/core/publiclinks", request);
  },

  getById: async (id: string): Promise<ApiResult<PublicLink>> => {
    return client.get(`/api/core/publiclink/${id}`);
  },

  update: async (
    id: string,
    request: UpdatePublicLinkRequest,
  ): Promise<ApiResult<PublicLink>> => {
    return client.put(`/api/core/publiclink/${id}`, request);
  },

  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/publiclink/${id}`);
  },
});
