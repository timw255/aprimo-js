import { AccessListEntry } from "./AccessListEntry";
import { FinancialHierarchyFundingAccountRef } from "./FinancialHierarchy";
import { PmPagedLinks } from "./PmPagedCollection";

/**
 * Ordering entry for a parent node's children — pairs a child id with its
 * sequence position so the tree can render in a stable order.
 */
export interface FinancialHierarchyNodeChildSequence {
  /** Parent node id. */
  financialHierarchyNodeId: number;
  /** Child node id. */
  childNodeId: number;
  /** 1-based sequence position among siblings. */
  sequence: number;
}

/**
 * One node in a financial hierarchy tree. Nodes can either be terminal
 * (carry funding accounts directly) or interior (have `childNodes`).
 */
export interface FinancialHierarchyNode {
  /** Stable numeric identifier for the node. */
  financialHierarchyNodeId: number;
  /** Parent hierarchy id. */
  financialHierarchyId: number;
  /** Encoded-title resource id. */
  encodedTitleId?: number;
  /** Display title. */
  title: string;
  /** `1` if a leaf node, `0` if it has children. */
  terminalNode?: number;
  /** Direct children of this node. */
  childNodes?: FinancialHierarchyNode[];
  /** Child sequencing entries for ordered display. */
  childSequence?: FinancialHierarchyNodeChildSequence[];
  /** Funding accounts attached at this node (terminal nodes only). */
  fundingAccounts?: FinancialHierarchyFundingAccountRef[];
}

/**
 * The full tree returned by `financialHierarchyNodes.getByHierarchyId` —
 * the hierarchy's root nodes plus the access list governing visibility.
 */
export interface FinancialHierarchyNodeTree {
  /** Parent hierarchy id. */
  financialHierarchyId: number;
  /** Top-level nodes of the tree. */
  nodes: FinancialHierarchyNode[];
  /** Access-list entries governing visibility. */
  accessList?: AccessListEntry[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
