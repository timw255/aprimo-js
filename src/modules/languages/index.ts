import { HttpClient } from "../../http";
import { QueryParams } from "../../model/QueryParams";
import { PagedCollection } from "../../model/PagedCollection";
import { ApiResult } from "../../client";
import { Expander } from "../../expander";
import { buildHeaders } from "../../utils";
import { Language } from "../../model/Language";
import { CreateFrom } from "../../model/CreateFrom";

export type CreateLanguageRequest = CreateFrom<Language>;

export type UpdateLanguageRequest = Partial<CreateLanguageRequest>;

export interface CreateLanguageResponse {
  id: string;
}
export const languages = (client: HttpClient) => ({
  /**
   * List the languages configured for the tenant. Returns one page; use
   * `getPaged` for full traversal, or `getById` for a single item.
   *
   * @example
   * ```ts
   * const res = await aprimo.languages.get();
   * ```
   */
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<Language>>> => {
    const headers = buildHeaders(params, expander);
    return client.get("/api/core/languages", headers);
  },

  /**
   * Async generator yielding pages of languages. Wraps `get` and follows
   * `_links.next` until exhausted.
   *
   * @example
   * ```ts
   * const all: Language[] = [];
   *
   * for await (const pageResult of aprimo.languages.getPaged({ pageSize: 1000 })) {
   *   all.push(...(pageResult.data?.items ?? []));
   * }
   *
   * console.log("Language count:", all.length);
   * ```
   */
  getPaged: async function* (
    params: QueryParams = {},
    expander?: Expander,
  ): AsyncGenerator<ApiResult<PagedCollection<Language>>, void, unknown> {
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
   * Fetch a single language by id. Failure (e.g., not found) surfaces as
   * `ok: false` with the HTTP status on `ApiResult`.
   */
  getById: async (
    id: string,
    expander?: Expander,
  ): Promise<ApiResult<Language>> => {
    const headers = buildHeaders(undefined, expander);
    return client.get(`/api/core/language/${id}`, headers);
  },

  /**
   * Add a new language to the tenant.
   */
  create: async (
    request: CreateLanguageRequest,
  ): Promise<ApiResult<CreateLanguageResponse>> => {
    return client.post("/api/core/languages", request);
  },

  /**
   * Update a language.
   */
  update: async (
    id: string,
    request: UpdateLanguageRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/language/${id}`, request);
  },

  /**
   * Remove a language from the tenant.
   */
  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/language/${id}`);
  },
});
