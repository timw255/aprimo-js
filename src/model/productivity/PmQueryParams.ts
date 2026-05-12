/** Paging controls for PM list endpoints. */
export interface PmPagingParams {
  /** Maximum number of items to return. */
  limit?: number;
  /** Zero-based starting offset into the result set. */
  offset?: number;
}

/**
 * Query-string params accepted by PM list endpoints. Includes the
 * standard paging fields plus an open-ended index for endpoint-specific
 * filters. Values are serialized by `buildQueryString`.
 */
export type PmQueryParams = PmPagingParams & {
  [key: string]: string | number | boolean | undefined;
};
