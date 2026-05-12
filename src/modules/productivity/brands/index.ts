import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Brand } from "../../../model/productivity/Brand";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

/**
 * Tenant-configured brands referenced from activities, classifications, and
 * other PM objects. Read-only: brands are managed in the PM admin UI.
 */
export const brands = (client: HttpClient) => ({
  /**
   * List brands.
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.brands.get();
   * ```
   */
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Brand, "brand">>> => {
    return client.get(`/api/brands${buildQueryString(params)}`);
  },
});
