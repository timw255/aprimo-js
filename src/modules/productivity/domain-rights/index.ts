import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { DomainRight } from "../../../model/productivity/DomainRight";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export const domainRights = (client: HttpClient) => ({
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<DomainRight, "domain-rights">>> => {
    return client.get(`/api/domain-rights${buildQueryString(params)}`);
  },
});
