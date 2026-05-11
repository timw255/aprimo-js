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
  /**
   * List setting categories. Returns one page; use `getPaged` for full
   * traversal, or `getById` for a single item.
   *
   * @example
   * ```ts
   * const res = await aprimo.settingCategories.get();
   * ```
   */
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<SettingCategory>>> => {
    const headers = buildHeaders(params, expander);

    return client.get("/api/core/settingcategories", headers);
  },

  /**
   * Async generator yielding pages of setting categories. Wraps `get` and
   * follows `_links.next` until exhausted.
   *
   * @example
   * ```ts
   * const all: SettingCategory[] = [];
   *
   * for await (const pageResult of aprimo.settingCategories.getPaged({ pageSize: 1000 })) {
   *   all.push(...(pageResult.data?.items ?? []));
   * }
   *
   * console.log("Setting category count:", all.length);
   * ```
   */
  getPaged: async function* (
    params: QueryParams = {},
    expander?: Expander,
  ): AsyncGenerator<
    ApiResult<PagedCollection<SettingCategory>>,
    void,
    unknown
  > {
    let currentPage = params.page ?? 1;
    const pageSize = params.pageSize ?? 100;

    while (true) {
      const result = await this.get(
        { ...params, page: currentPage, pageSize },
        expander,
      );

      yield result;

      if (!result.ok || !result.data?._links?.next) break;

      currentPage++;
    }
  },

  /**
   * Fetch a single setting category by id. Failure (e.g., not found) surfaces
   * as `ok: false` with the HTTP status on `ApiResult`.
   */
  getById: async (
    id: string,
    expander?: Expander,
  ): Promise<ApiResult<SettingCategory>> => {
    const headers = buildHeaders(undefined, expander);

    return client.get(`/api/core/settingcategory/${id}`, headers);
  },

  /**
   * Create a setting category.
   */
  create: async (
    request: CreateSettingCategoryRequest,
  ): Promise<ApiResult<SettingCategory>> => {
    return client.post("/api/core/settingcategories", request);
  },

  /**
   * Permanently delete a setting category.
   */
  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/settingcategory/${id}`);
  },
});
