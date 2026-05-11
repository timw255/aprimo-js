import { Expander } from "../../expander";
import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { DownloadLink } from "../../model/DownloadLink";
import { PagedCollection } from "../../model/PagedCollection";
import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";

export const downloadLinks = (client: HttpClient) => ({
  /**
   * List authenticated download links generated for files / renditions.
   *
   * @example
   * ```ts
   * const res = await aprimo.downloadLinks.get({ pageSize: 50 });
   * ```
   */
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<DownloadLink>>> => {
    const headers = buildHeaders(params, expander);

    return await client.get("/api/core/downloadlinks", headers);
  },

  /**
   * Fetch a single download link by id.
   *
   * @example
   * ```ts
   * const res = await aprimo.downloadLinks.getById(linkId);
   * ```
   */
  getById: async (
    id: string,
    expander?: Expander,
  ): Promise<ApiResult<DownloadLink>> => {
    const headers = buildHeaders(undefined, expander);

    return client.get(`/api/core/downloadlink/${id}`, headers);
  },
});
