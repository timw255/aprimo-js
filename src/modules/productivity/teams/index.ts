import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Team } from "../../../model/productivity/Team";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export const teams = (client: HttpClient) => ({
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Team, "teams">>> => {
    return client.get(`/api/teams${buildQueryString(params)}`);
  },

  getById: async (id: number | string): Promise<ApiResult<Team>> => {
    return client.get(`/api/teams/${id}`);
  },
});
