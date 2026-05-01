import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Brand } from "../../../model/productivity/Brand";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export const brands = (client: HttpClient) => ({
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Brand, "brands" | "brand">>> => {
    return client.get(`/api/brands${buildQueryString(params)}`);
  },
});
