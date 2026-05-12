import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { AccessListEntry } from "../../../model/productivity/AccessListEntry";
import {
  FundingAccount,
  FundingAccountBudget,
  FundingAccountSummary,
} from "../../../model/productivity/FundingAccount";

/** Payload for `fundingAccounts.create`. */
export interface CreateFundingAccountRequest {
  /** Free-form prefix used for display / matching. */
  fundingAccountPrefix?: string;
  /** Account type id. */
  fundingAccountType?: number;
  /** Display title. */
  title: string;
  /** Localized/long display title. */
  displayTitle?: string;
  /** Long-form description. */
  description?: string;
  /** Status id (typically active/inactive). */
  status?: number;
  /** Source id (where the budget originates from). */
  source?: number;
  /** PM user id administering the account. */
  administrator?: number;
  /** Finance-group classification id. */
  financeGroupClassification?: number;
  /** PM user id of the primary contact. */
  fundingAccountContact?: number;
  /** Fiscal year id this account is budgeted for. */
  fiscalYear?: number;
  /** Currency code id the budget is stated in. */
  budgetedCurrency?: number;
  /** PM user id of the creator. */
  creator?: number;
  /** Creation timestamp. */
  createdDate?: string;
  /** Exchange-rate id pinning the budget to a specific rate. */
  exchangeRate?: number;
  /** Per-fiscal-period budget breakdown. */
  budgets?: FundingAccountBudget[];
  /** Access-list entries governing visibility. */
  accessList?: AccessListEntry[];
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
}

/** Payload for `fundingAccounts.update`. */
export type UpdateFundingAccountRequest = Partial<CreateFundingAccountRequest>;

/**
 * Funding accounts — budgeted pools of money that commitments / invoices /
 * journal vouchers draw from. Each account carries a per-fiscal-period
 * budget and an access list; the `getSummary` helper returns the
 * computed budget vs. spend totals.
 */
export const fundingAccounts = (client: HttpClient) => ({
  /** Fetch a funding account by id. */
  getById: async (id: number | string): Promise<ApiResult<FundingAccount>> => {
    return client.get(`/api/funding-accounts/${id}`);
  },

  /**
   * Fetch the computed budget vs. spend summary for an account.
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.fundingAccounts.getSummary(42);
   * if (res.ok) console.log(res.data?.availableBudget);
   * ```
   */
  getSummary: async (
    id: number | string,
  ): Promise<ApiResult<FundingAccountSummary>> => {
    return client.get(`/api/funding-accounts/${id}/summary`);
  },

  /** Create a new funding account. */
  create: async (
    request: CreateFundingAccountRequest,
  ): Promise<ApiResult<FundingAccount>> => {
    return client.post("/api/funding-accounts", request);
  },

  /** Update an existing funding account. */
  update: async (
    id: number | string,
    request: UpdateFundingAccountRequest,
  ): Promise<ApiResult<FundingAccount>> => {
    return client.put(`/api/funding-accounts/${id}`, request);
  },
});
