import { AccessListEntry } from "./AccessListEntry";
import { PmPagedLinks } from "./PmPagedCollection";

/**
 * One row of the per-fiscal-period budget allocation on a funding account.
 */
export interface FundingAccountBudget {
  /** Fiscal period id within the account's fiscal year. */
  fiscalPeriodId: number;
  /** Budgeted amount for the period, in the account's currency. */
  enteredAmount: number;
}

/**
 * A funding account — a budgeted pool of money that commitments,
 * invoices, and journal vouchers draw from. Budgets are split into
 * per-fiscal-period rows; access is governed by a per-account access list.
 */
export interface FundingAccount {
  /** Stable numeric identifier. */
  fundingAccountId: number;
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
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
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
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}

/**
 * Computed budget vs. spend summary for a funding account, as returned by
 * `fundingAccounts.getSummary`. All amounts are in the account's
 * budgeted currency.
 */
export interface FundingAccountSummary {
  /** Original budgeted amount. */
  budget: number;
  /** Inbound transfers from other accounts. */
  inBound: number;
  /** Outbound transfers to other accounts. */
  outBound: number;
  /** Budget after in/out transfers (`budget + inBound - outBound`). */
  adjustedBudget: number;
  /** Pending (unpaid) invoiced amount. */
  pending: number;
  /** Paid invoiced amount. */
  paid: number;
  /** Remaining budget after commitments/invoices/forecasts. */
  availableBudget: number;
  /** Open outstanding commitments. */
  outstanding: number;
  /** Uncommitted available budget. */
  uncommittedBudget: number;
  /** Forecast-only allocations. */
  forecastAmount: number;
  /** Total committed (open + closed). */
  totalCommit: number;
  /** Closed commitments. */
  closedCommit: number;
  /** Open commitments. */
  outstandingCommit: number;
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
