import { ApiResult } from "../../client";
import { HeaderSource } from "../../select";
import { HttpClient } from "../../http";
import { PublicUri } from "../../model/PublicUri";
import { buildHeaders } from "../../utils";

export const publicUris = (client: HttpClient) => ({
  /**
   * Fetch a single public URI by id.
   *
   * Public URI ids come from `aprimo.fileVersions.getPublicUris(...)`.
   *
   * @example
   * ```ts
   * const res = await aprimo.publicUris.getById(publicUriId);
   * console.log(res.data?.uri, res.data?.status);
   * ```
   */
  getById: async (
    id: string,
    expander?: HeaderSource | HeaderSource[],
  ): Promise<ApiResult<PublicUri>> => {
    const headers = buildHeaders(undefined, expander);

    return client.get(`/api/core/publicuri/${id}`, headers);
  },
});
