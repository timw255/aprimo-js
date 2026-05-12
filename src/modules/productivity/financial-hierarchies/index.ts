import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { AccessListEntry } from "../../../model/productivity/AccessListEntry";
import {
  FinancialHierarchy,
  FinancialHierarchyFundingAccountRef,
  FinancialHierarchyUser,
} from "../../../model/productivity/FinancialHierarchy";

/** Payload for `financialHierarchies.create`. */
export interface CreateFinancialHierarchyRequest {
  /** Root node id (typically auto-created by the server). */
  rootNodeId?: number;
  /** Node id used to collect unassigned amounts. */
  unusedNodeId?: number;
  /** Whether to surface unused-bucket entries in UIs. */
  showUnused?: number;
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
  /** Users authorized to view/edit the hierarchy. */
  users?: FinancialHierarchyUser[];
  /** Funding accounts wired to this hierarchy. */
  fundingAccounts?: FinancialHierarchyFundingAccountRef[];
}

/** Payload for `financialHierarchies.update`. */
export type UpdateFinancialHierarchyRequest = Partial<CreateFinancialHierarchyRequest>;

/**
 * Financial hierarchies — the configurable rollup trees that funding
 * accounts/commitments roll up into for reporting. The tree itself is
 * exposed via {@link financialHierarchyNodes}.
 */
export const financialHierarchies = (client: HttpClient) => ({
  /** Fetch a hierarchy by id. */
  getById: async (
    id: number | string,
  ): Promise<ApiResult<FinancialHierarchy>> => {
    return client.get(`/api/financial-hierarchies/${id}`);
  },

  /** Create a new hierarchy. */
  create: async (
    request: CreateFinancialHierarchyRequest,
  ): Promise<ApiResult<FinancialHierarchy>> => {
    return client.post("/api/financial-hierarchies", request);
  },

  /** Update an existing hierarchy. */
  update: async (
    id: number | string,
    request: UpdateFinancialHierarchyRequest,
  ): Promise<ApiResult<FinancialHierarchy>> => {
    return client.put(`/api/financial-hierarchies/${id}`, request);
  },
});
