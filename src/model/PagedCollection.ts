import { ApiLink } from "./ApiLink";

/**
 * SDK-internal generic helper that models the shape of a paged collection
 * response (items + paging metadata + HAL links). The Aprimo DAM spec defines
 * many concrete `*pagedcollection` schemas (e.g. `Settingcategorypagedcollection`,
 * `Translationpagedcollection`) that share this shape; this generic captures
 * the common envelope so concrete collection types can be expressed as
 * `PagedCollection<T>`.
 */
export interface PagedCollection<T, L = DefaultPagedLinks> {
  /** One page of items. */
  items: T[];
  /** The current page number of this paged collection (1-based). Format: int32. */
  page: number;
  /** The current page size of this paged collection. Format: int32. */
  pageSize: number;
  /** The current skip size of this paged collection. Format: int32. */
  skip: number;
  /** The current take size of this paged collection. Format: int32. */
  take: number;
  /** The total count of items in this paged collection, not just on the current page. Format: int64. */
  totalCount: number;
  _links: L;
  _embedded?: {
    [K in Exclude<keyof L, "self">]?: L[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * Default HAL links exposed by paged collection responses (self plus
 * navigation links).
 */
export interface DefaultPagedLinks {
  self: ApiLink;
  first?: ApiLink;
  prev?: ApiLink;
  next?: ApiLink;
  last?: ApiLink;
}
