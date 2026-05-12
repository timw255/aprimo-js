import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Client } from "../../../model/productivity/Client";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

/**
 * Tenant-configured clients (agencies model the brands they work for as
 * clients here). Read-only: clients are managed in the PM admin UI.
 */
export const clients = (client: HttpClient) => ({
  /** List clients. */
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Client, "client">>> => {
    return client.get(`/api/clients${buildQueryString(params)}`);
  },
});
