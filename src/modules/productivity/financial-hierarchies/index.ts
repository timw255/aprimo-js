import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { AccessListEntry } from "../../../model/productivity/AccessListEntry";
import {
  FinancialHierarchy,
  FinancialHierarchyFundingAccountRef,
  FinancialHierarchyUser,
} from "../../../model/productivity/FinancialHierarchy";

export interface CreateFinancialHierarchyRequest {
  rootNodeId?: number;
  unusedNodeId?: number;
  showUnused?: number;
  fiscialYearId?: number;
  status?: number;
  encodedTitleId?: number;
  encodedTitle?: string;
  accessList?: AccessListEntry[];
  users?: FinancialHierarchyUser[];
  fundingAccounts?: FinancialHierarchyFundingAccountRef[];
}

export type UpdateFinancialHierarchyRequest = Partial<CreateFinancialHierarchyRequest>;

export const financialHierarchies = (client: HttpClient) => ({
  getById: async (
    id: number | string,
  ): Promise<ApiResult<FinancialHierarchy>> => {
    return client.get(`/api/financial-hierarchies/${id}`);
  },

  create: async (
    request: CreateFinancialHierarchyRequest,
  ): Promise<ApiResult<FinancialHierarchy>> => {
    return client.post("/api/financial-hierarchies", request);
  },

  update: async (
    id: number | string,
    request: UpdateFinancialHierarchyRequest,
  ): Promise<ApiResult<FinancialHierarchy>> => {
    return client.put(`/api/financial-hierarchies/${id}`, request);
  },
});
