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
  | "previewPlayers"
  | "registeredFields"
  | "registeredFieldGroups"
> & {
  catalogActions?: SetActions<FileTypeAction>;
  mediaEngines?: SetActions<string>;
  previewPlayers?: SetActions<string>;
  registeredFields?: SetActions<string>;
  registeredFieldGroups?: SetActions<string>;
};

export type UpdateFileTypeRequest = Partial<CreateFileTypeRequest>;

export interface CreateFileTypeResponse {
  id: string;
}

export const fileTypes = (client: HttpClient) => ({
  /**
   * List file-type definitions (mime-type / extension mappings). Returns one
   * page; use `getPaged` for full traversal, or `getById` for a single item.
   *
   * @example
   * ```ts
   * const res = await aprimo.fileTypes.get();
   * ```
   */
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<FileType>>> => {
    const headers = buildHeaders(params, expander);

    return client.get("/api/core/filetypes", headers);
  },

  /**
   * Fetch a single file type by id. Failure (e.g., not found) surfaces as
   * `ok: false` with the HTTP status on `ApiResult`.
   */
  getById: async (
    id: string,
    expander?: Expander,
  ): Promise<ApiResult<FileType>> => {
    const headers = buildHeaders(undefined, expander);

    return client.get(`/api/core/filetype/${id}`, headers);
  },

  /**
   * Async generator yielding pages of file types. Wraps `get` and follows
   * `_links.next` until exhausted.
   *
   * @example
   * ```ts
   * const all: FileType[] = [];
   *
   * for await (const pageResult of aprimo.fileTypes.getPaged({ pageSize: 1000 })) {
   *   all.push(...(pageResult.data?.items ?? []));
   * }
   *
   * console.log("File type count:", all.length);
   * ```
   */
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

  /**
   * Create a file type.
   *
   * @example
   * ```ts
   * const res = await aprimo.fileTypes.create({
   *   name: "WebP",
   *   extension: "webp",
   *   mimeType: "image/webp",
   * });
   * ```
   */
  create: async (
    request: CreateFileTypeRequest,
  ): Promise<ApiResult<FileType>> => {
    return client.post("/api/core/filetypes", request);
  },

  /**
   * Update a file type.
   */
  update: async (
    id: string,
    request: UpdateFileTypeRequest,
  ): Promise<ApiResult<FileType>> => {
    return await client.put(`/api/core/filetype/${id}`, request);
  },

  /**
   * Permanently delete a file type.
   */
  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/filetype/${id}`);
  },
});
