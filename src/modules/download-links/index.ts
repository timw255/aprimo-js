import { Expander } from "../../expander";
import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { DownloadLink } from "../../model/DownloadLink";
import { PagedCollection } from "../../model/PagedCollection";
import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";

export const downloadLinks = (client: HttpClient) => ({
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<DownloadLink>>> => {
    const headers = buildHeaders(params, expander);

    return await client.get("/api/core/downloadlinks", headers);
  },

  getById: async (
    id: string,
    expander?: Expander,
  ): Promise<ApiResult<DownloadLink>> => {
    const headers = buildHeaders(undefined, expander);

    return client.get(`/api/core/downloadlink/${id}`, headers);
  },
});
