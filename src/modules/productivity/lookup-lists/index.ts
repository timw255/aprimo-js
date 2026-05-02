import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { LookupList } from "../../../model/productivity/LookupList";
import { buildQueryString } from "../../../utils";

export interface LookupQueryParams {
  filterText?: string;
  subListID?: number | string;
  [key: string]: unknown;
}

export const lookupLists = (client: HttpClient) => ({
  getById: async (
    id: number | string,
    params?: LookupQueryParams,
  ): Promise<ApiResult<LookupList>> => {
    return client.get(`/api/lookup/${id}${buildQueryString(params)}`);
  },
});
