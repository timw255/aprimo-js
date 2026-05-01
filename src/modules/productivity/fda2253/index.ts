import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Fda2253Submission } from "../../../model/productivity/Fda2253";

export const fda2253 = (client: HttpClient) => ({
  submit: async (
    submission: Fda2253Submission,
    flatten: boolean = true,
  ): Promise<ApiResult<unknown>> => {
    const query = flatten ? "?flatten=true" : "";
    return client.post(`/api/fda2253${query}`, submission);
  },
});
