import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { SystemTypeCollection } from "../../../model/productivity/SystemTypeCollection";
import { SystemTypeItem } from "../../../model/productivity/SystemTypeItem";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export const systemTypes = (client: HttpClient) => ({
  get: async (): Promise<ApiResult<SystemTypeCollection>> => {
    return client.get("/api/system-types");
  },

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

  getById: async (
    typeName: string,
    id: number | string,
  ): Promise<ApiResult<SystemTypeItem>> => {
    return client.get(`/api/system-types/${typeName}/${id}`);
  },
});
