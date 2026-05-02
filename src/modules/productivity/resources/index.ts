import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Resource } from "../../../model/productivity/Resource";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";

export interface ResourceQueryRequest {
  query: string;
}

export interface ResourceQueryResponse {
  resources: { id: string; value: string }[];
}

export const resources = (client: HttpClient) => ({
  getById: async (id: string): Promise<ApiResult<Resource>> => {
    return client.get(`/api/resources/${id}`);
  },

  getStatic: async (): Promise<
    ApiResult<PmPagedCollection<Resource, "resources" | "resource">>
  > => {
    return client.get("/api/resources/static");
  },

  query: async (
    request: ResourceQueryRequest,
  ): Promise<ApiResult<ResourceQueryResponse>> => {
    return client.post("/api/resources/query", request);
  },
});
