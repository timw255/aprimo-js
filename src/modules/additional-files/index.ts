import { ApiResult } from "../../client";
import { AdditionalFile } from "../../model/AdditionalFile";
import { HttpClient } from "../../http";
import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";

export const additionalFiles = (client: HttpClient) => ({
  getById: async (
    id: string,
    params?: QueryParams,
  ): Promise<ApiResult<AdditionalFile>> => {
    const headers = buildHeaders(params);
    return client.get(`/api/core/additionalfile/${id}`, headers);
  },
});
