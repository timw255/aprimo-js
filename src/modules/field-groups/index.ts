import { FieldGroup } from "../../model/FieldGroup";
import { QueryParams } from "../../model/QueryParams";
import { SetActions } from "../../model/SetActions";
import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { Expander } from "../../expander";
import { buildHeaders } from "../../utils";

export interface CreateFieldGroupRequest {
  name: string;
  tag?: string;
  members?: SetActions<string>;
}

export interface UpdateFieldGroupRequest {
  name?: string;
  tag?: string;
  members?: SetActions<string>;
}

export const fieldGroups = (client: HttpClient) => ({
  /**
   * List field groups (named collections of related field definitions).
   * Returns one page; use `getPaged` for full traversal, or `getById` for a
   * single item.
   *
   * @example
   * ```ts
   * const res = await aprimo.fieldGroups.get();
   * ```
   */
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<FieldGroup>>> => {
    const headers = buildHeaders(params, expander);

    return client.get("/api/core/fieldgroups", headers);
  },

  /**
   * Async generator yielding pages of field groups. Wraps `get` and follows
   * `_links.next` until exhausted.
   *
   * @example
   * ```ts
   * const all: FieldGroup[] = [];
   *
   * for await (const pageResult of aprimo.fieldGroups.getPaged({ pageSize: 1000 })) {
   *   all.push(...(pageResult.data?.items ?? []));
   * }
   *
   * console.log("Field group count:", all.length);
   * ```
   */
  getPaged: async function* (
    params: QueryParams = {},
    expander?: Expander,
  ): AsyncGenerator<ApiResult<PagedCollection<FieldGroup>>, void, unknown> {
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
   * Fetch a single field group by id. Failure (e.g., not found) surfaces as
   * `ok: false` with the HTTP status on `ApiResult`.
   */
  getById: async (
    id: string,
    expander?: Expander,
  ): Promise<ApiResult<FieldGroup>> => {
    const headers = buildHeaders(undefined, expander);

    return client.get(`/api/core/fieldgroup/${id}`, headers);
  },

  /**
   * Create a field group.
   *
   * @example
   * ```ts
   * const res = await aprimo.fieldGroups.create({
   *   name: "Marketing",
   *   members: { addOrUpdate: [fieldDefId1, fieldDefId2] },
   * });
   * ```
   */
  create: async (
    request: CreateFieldGroupRequest,
  ): Promise<ApiResult<FieldGroup>> => {
    return client.post("/api/core/fieldgroups", request);
  },

  /**
   * Update a field group.
   *
   * @example
   * ```ts
   * await aprimo.fieldGroups.update(id, {
   *   members: { remove: [fieldDefId] },
   * });
   * ```
   */
  update: async (
    id: string,
    request: UpdateFieldGroupRequest,
  ): Promise<ApiResult<FieldGroup>> => {
    return client.put(`/api/core/fieldgroup/${id}`, request);
  },

  /**
   * Permanently delete a field group.
   */
  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/fieldgroup/${id}`);
  },
});
