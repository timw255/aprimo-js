import { Expander } from "../../expander";
import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { MaintenanceJob } from "../../model/MaintenanceJob";
import { PagedCollection } from "../../model/PagedCollection";
import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";

export const maintenanceJobs = (client: HttpClient) => ({
  /**
   * List background maintenance jobs and their status.
   *
   * @example
   * ```ts
   * const res = await aprimo.maintenanceJobs.get();
   * ```
   */
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<MaintenanceJob>>> => {
    const headers = buildHeaders(params, expander);

    return await client.get("/api/core/maintenancejobs", headers);
  },
});
