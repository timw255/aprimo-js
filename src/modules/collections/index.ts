import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";
import { Collection } from "../../model/Collection";
import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { Expander } from "../../expander";
import { SetActions } from "../../model";

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

export interface UpdateStaticCollectionRecordsRequest {
  records: SetActions<string>;
}

export const collections = (client: HttpClient) => ({
  /**
   * List collections (curated sets of records). Returns one page; use
   * `getPaged` for full traversal, or `getById` for a single item.
   *
   * @example
   * ```ts
   * const res = await aprimo.collections.get({ pageSize: 50 });
   * ```
   */
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<Collection>>> => {
    const headers = buildHeaders(params, expander);

    return client.get("/api/core/collections", headers);
  },

  /**
   * Fetch a single collection by id. Failure (e.g., not found) surfaces as
   * `ok: false` with the HTTP status on `ApiResult`.
   *
   * @example
   * ```ts
   * const res = await aprimo.collections.getById(collectionId);
   * ```
   */
  getById: async (
    id: string,
    expander?: Expander,
  ): Promise<ApiResult<Collection>> => {
    const headers = buildHeaders(undefined, expander);
    return client.get(`/api/core/collection/${id}`, headers);
  },

  /**
   * Async generator yielding pages of collections. Wraps `get` and follows
   * `_links.next` until exhausted.
   *
   * @example
   * ```ts
   * const all: Collection[] = [];
   *
   * for await (const pageResult of aprimo.collections.getPaged({ pageSize: 1000 })) {
   *   all.push(...(pageResult.data?.items ?? []));
   * }
   *
   * console.log("Collection count:", all.length);
   * ```
   */
  getPaged: async function* (
    params: QueryParams = {},
    expander?: Expander,
  ): AsyncGenerator<ApiResult<PagedCollection<Collection>>, void, unknown> {
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
   * Create a static collection (manually-curated record set).
   *
   * Use `updateRecords` afterwards to add records to the collection.
   *
   * @example
   * ```ts
   * const res = await aprimo.collections.createStatic({
   *   name: "Q3 launch assets",
   *   description: "Hero images for the Q3 launch",
   * });
   * ```
   */
  createStatic: async (
    request: CreateStaticCollectionRequest,
  ): Promise<ApiResult<CreateCollectionResponse>> => {
    return client.post("/api/core/collections", {
      ...request,
      type: "static",
    });
  },

  /**
   * Create a dynamic collection driven by a search expression. Membership is
   * recomputed automatically as records change.
   *
   * @example
   * ```ts
   * const res = await aprimo.collections.createDynamic({
   *   name: "All published videos",
   *   searchExpression: { expression: "ContentType = 'Video'", languages: ["en-US"] },
   * });
   * ```
   */
  createDynamic: async (
    request: CreateDynamicCollectionRequest,
  ): Promise<ApiResult<CreateCollectionResponse>> => {
    return client.post("/api/core/collections", {
      ...request,
      type: "dynamic",
    });
  },

  /**
   * Create a dynamic collection with both a top-level expression and
   * sub-expressions (typically used for grouped/faceted dynamic sets).
   */
  createDynamicWithSubExpressions: async (
    request: CreateDynamicCollectionWithSubExpressionsRequest,
  ): Promise<ApiResult<CreateCollectionResponse>> => {
    return client.post("/api/core/collections", {
      ...request,
      type: "dynamic",
    });
  },

  /**
   * Permanently delete a collection.
   *
   * @example
   * ```ts
   * await aprimo.collections.delete(collectionId);
   * ```
   */
  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/collection/${id}`);
  },

  /**
   * Add or remove record memberships on a static collection.
   *
   * @example
   * ```ts
   * await aprimo.collections.updateRecords(collectionId, {
   *   records: { addOrUpdate: [recordId1, recordId2] },
   * });
   * ```
   */
  updateRecords: async (
    id: string,
    request: UpdateStaticCollectionRecordsRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/collection/${id}/records`, request);
  },
});
