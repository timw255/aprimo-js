import { AccessListEntry } from "./AccessListEntry";
import { FinancialHierarchyFundingAccountRef } from "./FinancialHierarchy";
import { PmPagedLinks } from "./PmPagedCollection";

export interface FinancialHierarchyNodeChildSequence {
  financialHierarchyNodeId: number;
  childNodeId: number;
  sequence: number;
}

export interface FinancialHierarchyNode {
  financialHierarchyNodeId: number;
  financialHierarchyId: number;
  encodedTitleId?: number;
  title: string;
  terminalNode?: number;
  childNodes?: FinancialHierarchyNode[];
  childSequence?: FinancialHierarchyNodeChildSequence[];
  fundingAccounts?: FinancialHierarchyFundingAccountRef[];
}

export interface FinancialHierarchyNodeTree {
  financialHierarchyId: number;
  nodes: FinancialHierarchyNode[];
  accessList?: AccessListEntry[];
  _links?: PmPagedLinks;
}
