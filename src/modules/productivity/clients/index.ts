import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Client } from "../../../model/productivity/Client";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export const clients = (client: HttpClient) => ({
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Client, "client">>> => {
    return client.get(`/api/clients${buildQueryString(params)}`);
  },
});
