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
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<ContentType>>> => {
    const headers = buildHeaders(params, expander);

    return client.get("/api/core/contenttypes", headers);
  },

  getPaged: async function* (
    params: QueryParams = {},
    expander?: Expander,
  ): AsyncGenerator<ApiResult<PagedCollection<ContentType>>, void, unknown> {
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
  ): Promise<ApiResult<ContentType>> => {
    const headers = buildHeaders(undefined, expander);

    return client.get(`/api/core/contenttype/${id}`, headers);
  },

  create: async (
    request: CreateContentTypeRequest,
  ): Promise<ApiResult<CreateContentTypeResponse>> => {
    return client.post("/api/core/contenttypes", request);
  },

  update: async (
    id: string,
    request: EditContentTypeRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/contenttype/${id}`, request);
  },

  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/contenttype/${id}`);
  },
});
