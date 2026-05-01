import { ApiResult } from "../../client";
import { FileVersion } from "../../model/FileVersion";
import { HttpClient } from "../../http";
import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";

export const fileVersions = (client: HttpClient) => ({
  getById: async (
    id: string,
    params?: QueryParams,
  ): Promise<ApiResult<FileVersion>> => {
    const headers = buildHeaders(params);
    return client.get(`/api/core/fileversion/${id}`, headers);
  },
});
