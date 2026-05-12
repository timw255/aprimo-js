import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { SystemTypeCollection } from "../../../model/productivity/SystemTypeCollection";
import { SystemTypeItem } from "../../../model/productivity/SystemTypeItem";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

/**
 * "System types" — the catalog of tenant-configured enum lists that
 * back PM picker fields (`activityType`, `projectStatus`, `currencyCode`,
 * etc.). Use this module to resolve human-readable values for the
 * numeric ids used elsewhere in the SDK.
 */
export const systemTypes = (client: HttpClient) => ({
  /** List all available system-type names. */
  get: async (): Promise<ApiResult<SystemTypeCollection>> => {
    return client.get("/api/system-types");
  },

  /**
   * Fetch every item (active + inactive) for a given system type by name.
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.systemTypes.getByName("activityType");
   * ```
   */
  getByName: async (
    typeName: string,
    params?: PmQueryParams,
  ): Promise<
    ApiResult<PmPagedCollection<SystemTypeItem, "items">>
  > => {
    return client.get(
      `/api/system-types/${typeName}${buildQueryString(params)}`,
    );
  },

  /** Fetch only the active items for a given system type. */
  getActiveByName: async (
    typeName: string,
    params?: PmQueryParams,
  ): Promise<
    ApiResult<PmPagedCollection<SystemTypeItem, "items">>
  > => {
    return client.get(
      `/api/system-types/${typeName}/active${buildQueryString(params)}`,
    );
  },

  /** Fetch a single system-type item by its name + numeric id. */
  getById: async (
    typeName: string,
    id: number | string,
  ): Promise<ApiResult<SystemTypeItem>> => {
    return client.get(`/api/system-types/${typeName}/${id}`);
  },
});
