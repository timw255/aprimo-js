import { ContentType } from "../../model/ContentType";
import { QueryParams } from "../../model/QueryParams";
import { SetActions } from "../../model/SetActions";
import { ApiResult } from "../../client";
import { TitleConfiguration } from "../../model/TitleConfiguration";
import { FileConfiguration } from "../../model/FileConfiguration";
import { Label } from "../../model/Label";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { Expander } from "../../expander";
import { buildHeaders } from "../../utils";

export interface EditContentTypeRequest {
  name?: string;
  purpose?: string;
  parentId?: string;
  isNoFile?: boolean;
  registeredFields?: SetActions<string>;
  labels?: Label[];
  defaultFileExtensions?: SetActions<string>;
  titleConfiguration?: TitleConfiguration;
  inheritanceConfiguration?: "Custom" | "None";
  inheritanceFieldId?: string;
  inheritableFields?: SetActions<string>;
  fileMode?: "UploadFile" | "NoFile" | "CreateFromUrl" | "CreateFromSmartAgent";
  fileConfiguration?: FileConfiguration;
}

export interface CreateContentTypeRequest extends EditContentTypeRequest {
  name: string;
  titleConfiguration: TitleConfiguration;
}

export interface CreateContentTypeResponse {
  id: string;
}

export const contentTypes = (client: HttpClient) => ({
  /**
   * List content-type definitions. Returns one page; use `getPaged` for full
   * traversal, or `getById` for a single item.
   *
   * @example
   * ```ts
   * const res = await aprimo.contentTypes.get();
   * ```
   */
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<ContentType>>> => {
    const headers = buildHeaders(params, expander);

    return client.get("/api/core/contenttypes", headers);
  },

  /**
   * Async generator yielding pages of content types. Wraps `get` and follows
   * `_links.next` until exhausted.
   *
   * @example
   * ```ts
   * const all: ContentType[] = [];
   *
   * for await (const pageResult of aprimo.contentTypes.getPaged({ pageSize: 1000 })) {
   *   all.push(...(pageResult.data?.items ?? []));
   * }
   *
   * console.log("Content type count:", all.length);
   * ```
   */
  getPaged: async function* (
    params: QueryParams = {},
    expander?: Expander,
  ): AsyncGenerator<ApiResult<PagedCollection<ContentType>>, void, unknown> {
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
   * Fetch a single content type by id. Failure (e.g., not found) surfaces as
   * `ok: false` with the HTTP status on `ApiResult`.
   *
   * @example
   * ```ts
   * const res = await aprimo.contentTypes.getById(contentTypeId);
   * ```
   */
  getById: async (
    id: string,
    expander?: Expander,
  ): Promise<ApiResult<ContentType>> => {
    const headers = buildHeaders(undefined, expander);

    return client.get(`/api/core/contenttype/${id}`, headers);
  },

  /**
   * Create a content type. Requires at minimum `name` and `titleConfiguration`.
   *
   * @example
   * ```ts
   * const res = await aprimo.contentTypes.create({
   *   name: "Press Release",
   *   titleConfiguration: { ... },
   * });
   * ```
   */
  create: async (
    request: CreateContentTypeRequest,
  ): Promise<ApiResult<CreateContentTypeResponse>> => {
    return client.post("/api/core/contenttypes", request);
  },

  /**
   * Update a content type. Include only the fields you want to change.
   *
   * @example
   * ```ts
   * await aprimo.contentTypes.update(id, { name: "Renamed" });
   * ```
   */
  update: async (
    id: string,
    request: EditContentTypeRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/contenttype/${id}`, request);
  },

  /**
   * Permanently delete a content type.
   *
   * @example
   * ```ts
   * await aprimo.contentTypes.delete(id);
   * ```
   */
  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/contenttype/${id}`);
  },
});
