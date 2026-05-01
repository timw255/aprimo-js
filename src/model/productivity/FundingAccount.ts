import { AccessListEntry } from "./AccessListEntry";
import { PmPagedLinks } from "./PmPagedCollection";

export interface FundingAccountBudget {
  fiscalPeriodId: number;
  enteredAmount: number;
}

export interface FundingAccount {
  fundingAccountId: number;
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
  modifiedDate?: string;
  modifiedUser?: number;
  budgetedCurrency?: number;
  creator?: number;
  createdDate?: string;
  exchangeRate?: number;
  budgets?: FundingAccountBudget[];
  accessList?: AccessListEntry[];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  _links?: PmPagedLinks;
}

export interface FundingAccountSummary {
  budget: number;
  inBound: number;
  outBound: number;
  adjustedBudget: number;
  pending: number;
  paid: number;
  availableBudget: number;
  outstanding: number;
  uncommittedBudget: number;
  forecastAmount: number;
  totalCommit: number;
  closedCommit: number;
  outstandingCommit: number;
  _links?: PmPagedLinks;
}
