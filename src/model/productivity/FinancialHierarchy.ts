import { AccessListEntry } from "./AccessListEntry";
import { PmPagedLinks } from "./PmPagedCollection";

/**
 * A user authorized on a financial hierarchy.
 */
export interface FinancialHierarchyUser {
  /** Parent hierarchy id (echoed in the body). */
  financialHierarchyId?: number;
  /** PM user id. */
  userId: number;
}

/**
 * Reference to a funding account wired into a financial hierarchy.
 */
export interface FinancialHierarchyFundingAccountRef {
  /** Funding-account id. */
  fundingAccountId: number;
}

/**
 * A financial hierarchy — the rollup tree that funding accounts and
 * commitments aggregate into for reporting. The tree of nodes is
 * fetched separately via {@link financialHierarchyNodes}.
 */
export interface FinancialHierarchy {
  /** Stable numeric identifier. */
  financialHierarchyId: number;
  /** Root node id. */
  rootNodeId?: number;
  /** Node id used to collect unassigned amounts. */
  unusedNodeId?: number;
  /** Whether to surface unused-bucket entries in UIs. */
  showUnused?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** Fiscal year id this hierarchy covers. */
  fiscialYearId?: number;
  /** Status id (typically active/inactive). */
  status?: number;
  /** Encoded-title resource id. */
  encodedTitleId?: number;
  /** Encoded-title text. */
  encodedTitle?: string;
  /** Access-list entries governing visibility. */
  accessList?: AccessListEntry[];
  /** Users authorized on the hierarchy. */
  users?: FinancialHierarchyUser[];
  /** Funding accounts wired into the hierarchy. */
  fundingAccounts?: FinancialHierarchyFundingAccountRef[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
