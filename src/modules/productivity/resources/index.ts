import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Resource } from "../../../model/productivity/Resource";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";

export const resources = (client: HttpClient) => ({
  getById: async (id: string): Promise<ApiResult<Resource>> => {
    return client.get(`/api/resources/${id}`);
  },

  getStatic: async (): Promise<
    ApiResult<PmPagedCollection<Resource, "resources" | "resource">>
  > => {
    return client.get("/api/resources/static");
  },
});
