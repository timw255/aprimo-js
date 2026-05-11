import { ApiResult } from "../../client";
import { CalculatedPermission } from "../../model/CalculatedPermission";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { Permission } from "../../model/Permission";
import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";

export const permissions = (client: HttpClient) => ({
  /**
   * List the permissions defined in the tenant.
   *
   * @example
   * ```ts
   * const res = await aprimo.permissions.get();
   * ```
   */
  get: async (
    params?: QueryParams,
  ): Promise<ApiResult<PagedCollection<Permission>>> => {
    const headers = buildHeaders(params);

    return await client.get("/api/core/permissions", headers);
  },

  /**
   * Look up the calculated effective permission for the current user, by name.
   *
   * @param permissionName - Name of the permission to resolve.
   *
   * @example
   * ```ts
   * const res = await aprimo.permissions.getCalculated("EditRecords");
   * ```
   */
  getCalculated: async (
    permissionName: string,
  ): Promise<ApiResult<CalculatedPermission>> => {
    return client.get(`/api/core/calculatedpermission/${permissionName}`);
  },
});
