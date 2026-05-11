/**
 * SDK-internal helper describing common query string parameters used by
 * collection / paged endpoints. Not a response schema.
 */
export interface QueryParams {
  /** Search/filter expression to apply to the listing. */
  filter?: string;
  /** Sort expression (e.g. `name asc`, `modifiedOn desc`). */
  sort?: string;
  /** 1-based page number. */
  page?: number;
  /** Page size for `page`-style pagination. */
  pageSize?: number;
  /** Number of items to skip for skip/take-style pagination. */
  skip?: number;
  /** Number of items to take for skip/take-style pagination. */
  take?: number;
}
