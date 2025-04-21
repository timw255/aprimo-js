import { Expander } from "../../expander";
import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { MaintenanceJob } from "../../model/MaintenanceJob";
import { PagedCollection } from "../../model/PagedCollection";
import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";

export const maintenanceJobs = (client: HttpClient) => ({
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<MaintenanceJob>>> => {
    const headers = buildHeaders(params, expander);

    return await client.get("/api/core/maintenancejobs", headers);
  },
});
