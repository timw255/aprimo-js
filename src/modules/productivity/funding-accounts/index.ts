import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { AccessListEntry } from "../../../model/productivity/AccessListEntry";
import {
  FundingAccount,
  FundingAccountBudget,
  FundingAccountSummary,
} from "../../../model/productivity/FundingAccount";

export interface CreateFundingAccountRequest {
  fundingAccountPrefix?: string;
  fundingAccountType?: number;
  title: string;
  displayTitle?: string;
  description?: string;
  status?: number;
  source?: number;
  administrator?: number;
  financeGroupClassification?: number;
  fundingAccountContact?: number;
  fiscalYear?: number;
  budgetedCurrency?: number;
  creator?: number;
  createdDate?: string;
  exchangeRate?: number;
  budgets?: FundingAccountBudget[];
  accessList?: AccessListEntry[];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
}

export type UpdateFundingAccountRequest = Partial<CreateFundingAccountRequest>;

export const fundingAccounts = (client: HttpClient) => ({
  getById: async (id: number | string): Promise<ApiResult<FundingAccount>> => {
    return client.get(`/api/funding-accounts/${id}`);
  },

  getSummary: async (
    id: number | string,
  ): Promise<ApiResult<FundingAccountSummary>> => {
    return client.get(`/api/funding-accounts/${id}/summary`);
  },

  create: async (
    request: CreateFundingAccountRequest,
  ): Promise<ApiResult<FundingAccount>> => {
    return client.post("/api/funding-accounts", request);
  },

  update: async (
    id: number | string,
    request: UpdateFundingAccountRequest,
  ): Promise<ApiResult<FundingAccount>> => {
    return client.put(`/api/funding-accounts/${id}`, request);
  },
});
