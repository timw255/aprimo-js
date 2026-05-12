import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { FinancialHierarchyNodeTree } from "../../../model/productivity/FinancialHierarchyNode";

/**
 * Read-only access to the node tree of a {@link FinancialHierarchy}.
 * Mutations to hierarchy structure are not exposed through the public PM API.
 */
export const financialHierarchyNodes = (client: HttpClient) => ({
  /**
   * Fetch the full node tree (and access list) for a hierarchy.
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.financialHierarchyNodes
   *   .getByHierarchyId(42);
   * ```
   */
  getByHierarchyId: async (
    hierarchyId: number | string,
  ): Promise<ApiResult<FinancialHierarchyNodeTree>> => {
    return client.get(`/api/financial-hierarchy-nodes/${hierarchyId}`);
  },
});
