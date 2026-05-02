import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { ProgramProposal } from "../../../model/productivity/ProgramProposal";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { PmSearchRequest } from "../../../model/productivity/PmSearchRequest";
import { buildQueryString } from "../../../utils";

export type ProgramProposalSearchRequest = PmSearchRequest;

export const programProposals = (client: HttpClient) => ({
  getById: async (
    id: number | string,
  ): Promise<ApiResult<ProgramProposal>> => {
    return client.get(`/api/program-proposals/${id}`);
  },

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
