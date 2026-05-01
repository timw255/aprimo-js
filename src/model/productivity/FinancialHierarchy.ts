import { AccessListEntry } from "./AccessListEntry";
import { PmPagedLinks } from "./PmPagedCollection";

export interface FinancialHierarchyUser {
  financialHierarchyId?: number;
  userId: number;
}

export interface FinancialHierarchyFundingAccountRef {
  fundingAccountId: number;
}

export interface FinancialHierarchy {
  financialHierarchyId: number;
  rootNodeId?: number;
  unusedNodeId?: number;
  showUnused?: number;
  modifiedDate?: string;
  modifiedUser?: number;
  fiscialYearId?: number;
  status?: number;
  encodedTitleId?: number;
  encodedTitle?: string;
  accessList?: AccessListEntry[];
  users?: FinancialHierarchyUser[];
  fundingAccounts?: FinancialHierarchyFundingAccountRef[];
  _links?: PmPagedLinks;
}
