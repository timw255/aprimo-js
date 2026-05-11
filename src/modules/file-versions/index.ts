import { ApiResult } from "../../client";
import { FileVersion } from "../../model/FileVersion";
import { HttpClient } from "../../http";
import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";

export const fileVersions = (client: HttpClient) => ({
  /**
   * Fetch a single file version by id.
   *
   * Use this when you have a file-version id from an `Expander` chain
   * (e.g., `Record -> masterfile -> fileversions`) and need the full payload.
   *
   * @example
   * ```ts
   * const res = await aprimo.fileVersions.getById(fileVersionId);
   * ```
   */
  getById: async (
    id: string,
    params?: QueryParams,
  ): Promise<ApiResult<FileVersion>> => {
    const headers = buildHeaders(params);
    return client.get(`/api/core/fileversion/${id}`, headers);
  },
});
