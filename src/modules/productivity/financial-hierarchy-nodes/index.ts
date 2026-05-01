import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { FinancialHierarchyNodeTree } from "../../../model/productivity/FinancialHierarchyNode";

export const financialHierarchyNodes = (client: HttpClient) => ({
  getByHierarchyId: async (
    hierarchyId: number | string,
  ): Promise<ApiResult<FinancialHierarchyNodeTree>> => {
    return client.get(`/api/financial-hierarchy-nodes/${hierarchyId}`);
  },
});
