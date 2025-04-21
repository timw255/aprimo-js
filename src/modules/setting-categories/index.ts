import { Expander } from "../../expander";
import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { CreateFrom } from "../../model/CreateFrom";
import { PagedCollection } from "../../model/PagedCollection";
import { QueryParams } from "../../model/QueryParams";
import { SettingCategory } from "../../model/SettingCategory";
import { buildHeaders } from "../../utils";

export type CreateSettingCategoryRequest = CreateFrom<SettingCategory>;

export const settingCategories = (client: HttpClient) => ({
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<SettingCategory>>> => {
    const headers = buildHeaders(params, expander);

    return client.get("/api/core/settingcategories", headers);
  },

  getPaged: async function* (
    params: QueryParams = {},
    expander?: Expander,
  ): AsyncGenerator<
    ApiResult<PagedCollection<SettingCategory>>,
    void,
    unknown
  > {
    let currentPage = params.page || 1;
    const pageSize = params.pageSize || 100;

    while (true) {
      const result = await this.get(
        { ...params, page: currentPage, pageSize },
        expander,
      );

      yield result;

      if (!result.ok || !result.data || !result.data._links?.next) break;

      currentPage++;
    }
  },

  getById: async (
    id: string,
    expander?: Expander,
  ): Promise<ApiResult<SettingCategory>> => {
    const headers = buildHeaders(undefined, expander);

    return client.get(`/api/core/settingcategory/${id}`, headers);
  },

  create: async (
    request: CreateSettingCategoryRequest,
  ): Promise<ApiResult<SettingCategory>> => {
    return client.post("/api/core/settingcategories", request);
  },

  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/settingcategory/${id}`);
  },
});
