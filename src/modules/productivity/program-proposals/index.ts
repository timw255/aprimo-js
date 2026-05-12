import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { ProgramProposal } from "../../../model/productivity/ProgramProposal";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { PmSearchRequest } from "../../../model/productivity/PmSearchRequest";
import { buildQueryString } from "../../../utils";

/** Search payload — uses the generic PM search-tree grammar. */
export type ProgramProposalSearchRequest = PmSearchRequest;

/**
 * Program proposals — planning documents shaped like programs, used to
 * scope cost/effort/timeline before committing to a real `Program`. The
 * SDK exposes read + search; creation/approval flows through the PM UI.
 */
export const programProposals = (client: HttpClient) => ({
  /** Fetch a program proposal by id. */
  getById: async (
    id: number | string,
  ): Promise<ApiResult<ProgramProposal>> => {
    return client.get(`/api/program-proposals/${id}`);
  },

  /** Search proposals using the PM search-tree grammar. */
  search: async (
    request: ProgramProposalSearchRequest,
    params?: PmQueryParams,
  ): Promise<
    ApiResult<PmPagedCollection<ProgramProposal, "program-proposal" | "program-proposals">>
  > => {
    return client.post(
      `/api/program-proposals/search${buildQueryString(params)}`,
      request,
    );
  },
});
