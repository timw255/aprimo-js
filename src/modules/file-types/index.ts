import { Expander } from "../../expander";
import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { CreateFrom } from "../../model/CreateFrom";
import { FileType } from "../../model/FileType";
import { FileTypeAction } from "../../model/FileTypeAction";
import { PagedCollection } from "../../model/PagedCollection";
import { QueryParams } from "../../model/QueryParams";
import { SetActions } from "../../model/SetActions";
import { buildHeaders } from "../../utils";

export type CreateFileTypeRequest = Omit<
  CreateFrom<FileType>,
  | "catalogActions"
  | "mediaEngines"
  | "previewRenderWebControls"
  | "registeredFields"
  | "registeredFieldGroups"
> & {
  catalogActions?: SetActions<FileTypeAction>;
  mediaEngines?: SetActions<string>;
  previewRenderWebControls?: SetActions<string>;
  registeredFields?: SetActions<string>;
  registeredFieldGroups?: SetActions<string>;
};

export type UpdateFileTypeRequest = CreateFileTypeRequest;

export interface CreateFileTypeResponse {
  id: string;
}

export const fileTypes = (client: HttpClient) => ({
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<FileType>>> => {
    const headers = buildHeaders(params, expander);

    return client.get("/api/core/filetypes", headers);
  },

  getById: async (
    id: string,
    expander?: Expander,
  ): Promise<ApiResult<FileType>> => {
    const headers = buildHeaders(undefined, expander);

    return client.get(`/api/core/filetype/${id}`, headers);
  },

  getPaged: async function* (
    params: QueryParams = {},
    expander?: Expander,
  ): AsyncGenerator<ApiResult<PagedCollection<FileType>>, void, unknown> {
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

  create: async (
    request: CreateFileTypeRequest,
  ): Promise<ApiResult<FileType>> => {
    return client.post("/api/core/filetypes", request);
  },

  update: async (
    id: string,
    request: UpdateFileTypeRequest,
  ): Promise<ApiResult<FileType>> => {
    return await client.put(`/api/core/filetype/${id}`, request);
  },

  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/filetype/${id}`);
  },
});
