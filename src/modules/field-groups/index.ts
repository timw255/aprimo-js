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
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<FieldGroup>>> => {
    const headers = buildHeaders(params, expander);

    return client.get("/api/core/fieldgroups", headers);
  },

  getPaged: async function* (
    params: QueryParams = {},
    expander?: Expander,
  ): AsyncGenerator<ApiResult<PagedCollection<FieldGroup>>, void, unknown> {
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
  ): Promise<ApiResult<FieldGroup>> => {
    const headers = buildHeaders(undefined, expander);

    return client.get(`/api/core/fieldgroup/${id}`, headers);
  },

  create: async (
    request: CreateFieldGroupRequest,
  ): Promise<ApiResult<FieldGroup>> => {
    return client.post("/api/core/fieldgroups", request);
  },

  update: async (
    id: string,
    request: UpdateFieldGroupRequest,
  ): Promise<ApiResult<FieldGroup>> => {
    return client.put(`/api/core/fieldgroup/${id}`, request);
  },

  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/fieldgroup/${id}`);
  },
});
