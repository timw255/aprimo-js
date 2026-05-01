import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { LookupList } from "../../../model/productivity/LookupList";

export const lookupLists = (client: HttpClient) => ({
  getById: async (id: number | string): Promise<ApiResult<LookupList>> => {
    return client.get(`/api/lookup/${id}`);
  },
});
