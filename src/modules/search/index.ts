import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { SearchResponse } from "../../model/SearchResponse";

export interface SearchExpression {
  disabledKeywords?: string[];
  supportWildcards?: boolean;
  defaultLogicalOperator?: "AND" | "OR";
  languages?: string[];
  expression?: string;
  parameters?: (string | number)[];
  namedParameters?: Record<string, string | number>;
  subExpressions?: SearchExpression[];
}

export interface ClassificationSearchRequest {
  searchExpression: SearchExpression;
  logRequest?: boolean;
}

export interface RecordSearchRequest {
  searchExpression: SearchExpression;
  facets?: Facet[];
  logRequest?: boolean;
  ignoreInvalidFacets?: boolean;
}

export interface Facet {
  name: string;
  values: FacetValue[];
}

export interface FacetValue {
  key: string;
  count: number;
}

export const search = (client: HttpClient) => ({
  records: async (
    request: RecordSearchRequest,
  ): Promise<ApiResult<SearchResponse>> => {
    return client.post<SearchResponse>("/api/core/search/records", request);
  },

  classifications: async (
    request: ClassificationSearchRequest,
  ): Promise<ApiResult<SearchResponse>> => {
    return client.post<SearchResponse>(
      "/api/core/search/classifications",
      request,
    );
  },

  rebuildIndex: async (): Promise<void> => {
    await client.put("/api/core/searchindex", {
      rebuildScheduled: true,
    });
  },
});
