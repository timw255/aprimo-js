import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";
import { Collection } from "../../model/Collection";
import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { Expander } from "../../expander";

export interface CreateStaticCollectionRequest {
  name: string;
  description: string;
  type?: "static";
  tag?: string;
}

export interface CreateDynamicCollectionRequest {
  name: string;
  type?: "dynamic";
  searchExpression: SearchExpression;
  tag?: string;
}

export interface CreateDynamicCollectionWithSubExpressionsRequest {
  name: string;
  type?: "dynamic";
  searchExpression: SearchExpression;
  subExpressions: SubExpression[];
  tag?: string;
}

export interface SearchExpression {
  expression: string;
  languages: string[];
}

export interface SubExpression {
  expression: string;
  languages: string[];
}

export interface CreateCollectionResponse {
  id: string;
}

export const collections = (client: HttpClient) => ({
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<Collection>>> => {
    const headers = buildHeaders(params, expander);

    return client.get("/api/core/collections", headers);
  },

  getPaged: async function* (
    params: QueryParams = {},
    expander?: Expander,
  ): AsyncGenerator<ApiResult<PagedCollection<Collection>>, void, unknown> {
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

  createStatic: async (
    request: CreateStaticCollectionRequest,
  ): Promise<ApiResult<CreateCollectionResponse>> => {
    return client.post("/api/core/collections", {
      ...request,
      type: "static",
    });
  },

  createDynamic: async (
    request: CreateDynamicCollectionRequest,
  ): Promise<ApiResult<CreateCollectionResponse>> => {
    return client.post("/api/core/collections", {
      ...request,
      type: "dynamic",
    });
  },

  createDynamicWithSubExpressions: async (
    request: CreateDynamicCollectionWithSubExpressionsRequest,
  ): Promise<ApiResult<CreateCollectionResponse>> => {
    return client.post("/api/core/collections", {
      ...request,
      type: "dynamic",
    });
  },

  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/collection/${id}`);
  },
});
