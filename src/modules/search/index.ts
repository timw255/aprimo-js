import { ApiResult } from "../../client";
import { Expander } from "../../expander";
import { HttpClient } from "../../http";
import { SearchResponse } from "../../model/SearchResponse";
import { buildHeaders } from "../../utils";

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
    expander?: Expander,
  ): Promise<ApiResult<SearchResponse>> => {
    const headers = buildHeaders(undefined, expander);

    return client.post<SearchResponse>(
      "/api/core/search/records",
      request,
      headers,
    );
  },

  classifications: async (
    request: ClassificationSearchRequest,
    expander?: Expander,
  ): Promise<ApiResult<SearchResponse>> => {
    const headers = buildHeaders(undefined, expander);

    return client.post<SearchResponse>(
      "/api/core/search/classifications",
      request,
      headers,
    );
  },

  rebuildIndex: async (): Promise<void> => {
    await client.put("/api/core/searchindex", {
      rebuildScheduled: true,
    });
  },
});
