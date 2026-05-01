import { ApiResult } from "../../client";
import { CalculatedPermission } from "../../model/CalculatedPermission";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { Permission } from "../../model/Permission";
import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";

export const permissions = (client: HttpClient) => ({
  get: async (
    params?: QueryParams,
  ): Promise<ApiResult<PagedCollection<Permission>>> => {
    const headers = buildHeaders(params);

    return await client.get("/api/core/permissions", headers);
  },

  getCalculated: async (
    permissionName: string,
  ): Promise<ApiResult<CalculatedPermission>> => {
    return client.get(`/api/core/calculatedpermission/${permissionName}`);
  },
});
