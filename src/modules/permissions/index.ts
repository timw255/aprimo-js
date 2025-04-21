import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { Permission } from "../../model/Permission";
import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";

export const permissions = (client: HttpClient) => ({
  get: async (
    params?: QueryParams,
  ): Promise<ApiResult<PagedCollection<Permission>>> => {
    const headers = buildHeaders(params, undefined);
    return await client.get("/api/core/permissions", headers);
  },
});
