import { ApiResult } from "../../client";
import { Expander } from "../../expander";
import { HttpClient } from "../../http";
import { SearchResponse } from "../../model/SearchResponse";
import { buildHeaders } from "../../utils";

/**
 * An Aprimo search expression. The simplest form is just `{ expression: "..." }`
 * containing the Aprimo search-language string. Use `parameters` /
 * `namedParameters` to safely interpolate values, and `subExpressions` to
 * compose nested clauses joined by `defaultLogicalOperator`.
 *
 * See the official Aprimo docs for the search-expression grammar.
 */
export interface SearchExpression {
  /** Keywords to disable for this search (e.g., reserved tokens). */
  disabledKeywords?: string[];
  /** When `true`, allow `*`/`?` wildcards in the expression. */
  supportWildcards?: boolean;
  /** Operator used to join `subExpressions`. Defaults to API behavior. */
  defaultLogicalOperator?: "AND" | "OR";
  /** Restrict matching to these language ids. */
  languages?: string[];
  /** The expression string, e.g. `"Title CONTAINS @0"`. */
  expression?: string;
  /** Positional parameter values referenced by `@0`, `@1`, ... in `expression`. */
  parameters?: (string | number)[];
  /** Named parameter values referenced by `@name` in `expression`. */
  namedParameters?: Record<string, string | number>;
  /** Nested expressions joined by `defaultLogicalOperator`. */
  subExpressions?: SearchExpression[];
}

/** Payload for `search.classifications`. */
export interface ClassificationSearchRequest {
  searchExpression: SearchExpression;
  /** When `true`, request the server log this query for diagnostics. */
  logRequest?: boolean;
  /** 1-based page number. */
  page?: number;
  /** Number of items per page. Default 50, max 1000. */
  pageSize?: number;
}

/** Payload for `search.records`. */
export interface RecordSearchRequest {
  searchExpression: SearchExpression;
  /** Facets to compute alongside the result set. */
  facets?: Facet[];
  /** When `true`, request the server log this query for diagnostics. */
  logRequest?: boolean;
  /** When `true`, skip invalid facets instead of erroring. */
  ignoreInvalidFacets?: boolean;
  /** 1-based page number. */
  page?: number;
  /** Number of items per page. Default 50, max 1000. */
  pageSize?: number;
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
  /**
   * Search records by Aprimo search expression.
   *
   * @param request - Search payload. The minimum is
   *   `{ searchExpression: { expression: "<query>" } }`.
   * @param expander - Optional `Expander` chain to embed related resources
   *   on each returned record (e.g., master file, fields).
   *
   * @example
   * ```ts
   * const res = await aprimo.search.records({
   *   searchExpression: { expression: "CreatedOn > 2024-01-01T00:00:00.000Z" },
   * });
   * if (res.ok) console.log(res.data?.items.length);
   * ```
   */
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

  /**
   * Search classifications by Aprimo search expression.
   *
   * @param request - Search payload.
   * @param expander - Optional `Expander` chain.
   *
   * @example
   * ```ts
   * const res = await aprimo.search.classifications({
   *   searchExpression: { expression: "Name CONTAINS 'campaign'" },
   * });
   * ```
   */
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

  /**
   * Schedule a full rebuild of the search index. Heavy server-side operation —
   * usually only run by administrators after large schema or data changes.
   *
   * @example
   * ```ts
   * await aprimo.search.rebuildIndex();
   * ```
   */
  rebuildIndex: async (): Promise<void> => {
    await client.put("/api/core/searchindex", {
      rebuildScheduled: true,
    });
  },
});
