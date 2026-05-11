import { ApiResult } from "../../client";
import { AdditionalFile } from "../../model/AdditionalFile";
import { HttpClient } from "../../http";
import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";

export const additionalFiles = (client: HttpClient) => ({
  /**
   * Fetch an additional (non-master) file by id.
   *
   * Additional files are auxiliary uploads attached to a file version
   * (e.g., proxy/preview files alongside a master).
   *
   * @example
   * ```ts
   * const res = await aprimo.additionalFiles.getById(additionalFileId);
   * ```
   */
  getById: async (
    id: string,
    params?: QueryParams,
  ): Promise<ApiResult<AdditionalFile>> => {
    const headers = buildHeaders(params);
    return client.get(`/api/core/additionalfile/${id}`, headers);
  },
});
