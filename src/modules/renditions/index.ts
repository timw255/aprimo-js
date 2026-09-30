import { ApiResult } from "../../client";
import { HeaderSource } from "../../select";
import { HttpClient } from "../../http";
import { Rendition } from "../../model/Rendition";
import { buildHeaders } from "../../utils";

export const renditions = (client: HttpClient) => ({
  /**
   * Fetch a single rendition by id.
   *
   * Rendition ids come from `aprimo.fileVersions.getRenditions(...)` or from a
   * `FileVersion -> renditions` expansion.
   *
   * @example
   * ```ts
   * const res = await aprimo.renditions.getById(renditionId);
   * console.log(res.data?.uri, res.data?.type);
   * ```
   */
  getById: async (
    id: string,
    expander?: HeaderSource | HeaderSource[],
  ): Promise<ApiResult<Rendition>> => {
    const headers = buildHeaders(undefined, expander);

    return client.get(`/api/core/rendition/${id}`, headers);
  },
});
