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
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<Language>>> => {
    const headers = buildHeaders(params, expander);
    return client.get("/api/core/languages", headers);
  },

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

  getById: async (
    id: string,
    expander?: Expander,
  ): Promise<ApiResult<Language>> => {
    const headers = buildHeaders(undefined, expander);
    return client.get(`/api/core/language/${id}`, headers);
  },

  create: async (
    request: CreateLanguageRequest,
  ): Promise<ApiResult<CreateLanguageResponse>> => {
    return client.post("/api/core/languages", request);
  },

  update: async (
    id: string,
    request: UpdateLanguageRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/language/${id}`, request);
  },

  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/language/${id}`);
  },
});
