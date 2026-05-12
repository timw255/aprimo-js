import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Team } from "../../../model/productivity/Team";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

/**
 * PM teams — named user groupings used to staff activities/projects. Read-only
 * from the SDK: team composition is managed in the PM admin UI.
 */
export const teams = (client: HttpClient) => ({
  /** List teams. */
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Team, "teams">>> => {
    return client.get(`/api/teams${buildQueryString(params)}`);
  },

  /** Fetch a single team by id. */
  getById: async (id: number | string): Promise<ApiResult<Team>> => {
    return client.get(`/api/teams/${id}`);
  },
});
