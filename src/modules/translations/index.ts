import { Expander } from "../../expander";
import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { CreateFrom } from "../../model/CreateFrom";
import { PagedCollection } from "../../model/PagedCollection";
import { QueryParams } from "../../model/QueryParams";
import { Translation } from "../../model/Translation";
import { buildHeaders } from "../../utils";

export type CreateTranslationRequest = CreateFrom<Translation>;

export type UpdateTranslationRequest = Partial<CreateTranslationRequest>;

export interface CreateTranslationResponse {
  id: string;
}

export const translations = (client: HttpClient) => ({
  /**
   * List UI/label translations. Returns one page; use `getPaged` for full
   * traversal, or `getById` for a single item.
   *
   * @example
   * ```ts
   * const res = await aprimo.translations.get();
   * ```
   */
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<Translation>>> => {
    const headers = buildHeaders(params, expander);

    return await client.get("/api/core/translations", headers);
  },

  /**
   * Fetch a single translation by id. Failure (e.g., not found) surfaces as
   * `ok: false` with the HTTP status on `ApiResult`.
   */
  getById: async (
    id: string,
    expander?: Expander,
  ): Promise<ApiResult<Translation>> => {
    const headers = buildHeaders(undefined, expander);

    return client.get(`/api/core/translation/${id}`, headers);
  },

  /**
   * Async generator yielding pages of translations. Wraps `get` and follows
   * `_links.next` until exhausted.
   *
   * @example
   * ```ts
   * const all: Translation[] = [];
   *
   * for await (const pageResult of aprimo.translations.getPaged({ pageSize: 1000 })) {
   *   all.push(...(pageResult.data?.items ?? []));
   * }
   *
   * console.log("Translation count:", all.length);
   * ```
   */
  getPaged: async function* (
    params: QueryParams = {},
    expander?: Expander,
  ): AsyncGenerator<ApiResult<PagedCollection<Translation>>, void, unknown> {
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
   * Create a translation.
   */
  create: async (
    request: CreateTranslationRequest,
  ): Promise<ApiResult<Translation>> => {
    return client.post("/api/core/translations", request);
  },

  /**
   * Update a translation.
   */
  update: async (
    id: string,
    request: UpdateTranslationRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/translation/${id}`, request);
  },

  /**
   * Permanently delete a translation.
   */
  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/translation/${id}`);
  },
});
