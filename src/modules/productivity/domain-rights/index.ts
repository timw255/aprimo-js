import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { DomainRight } from "../../../model/productivity/DomainRight";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

/**
 * Catalog of PM function rights that can be granted (per domain) to users
 * and groups. Read-only: the catalog itself is defined by Aprimo.
 */
export const domainRights = (client: HttpClient) => ({
  /**
   * List every available function right. Use the resulting `functionID` /
   * `name` pairs to build right-management UIs or audits.
   */
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<DomainRight, "domain-rights">>> => {
    return client.get(`/api/domain-rights${buildQueryString(params)}`);
  },
});
