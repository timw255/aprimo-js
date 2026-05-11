import { ApiLink } from "./ApiLink";
import { LinkedVersionInfo } from "./LinkedVersionInfo";

/**
 * Representation of a paged collection of LinkedVersionInfo items.
 */
export interface LinkedVersionInfoCollection {
  /** One page of linked version info items from this collection. */
  items: LinkedVersionInfo[];
  /** The current page of this paged collection. Format: int32. */
  page: number;
  /** The current page size of this paged collection. Format: int32. */
  pageSize: number;
  /** The current skip size of this paged collection. Format: int32. */
  skip: number;
  /** The current take size of this paged collection. Format: int32. */
  take: number;
  /** The total count of items in this paged collection, not just on the current page. Format: int64. */
  totalCount: number;
  /**
   * HAL-style hypermedia links for this collection.
   */
  _links: LinkedVersionInfoCollectionLinks;
  /** Embedded related resources, keyed by link relation. */
  _embedded?: {
    [K in Exclude<
      keyof LinkedVersionInfoCollectionLinks,
      "self"
    >]?: LinkedVersionInfoCollectionLinks[K] extends ApiLink<infer R>
      ? R
      : never;
  };
}

/** HAL-style link relations exposed on a LinkedVersionInfoCollection (pagination links). */
export interface LinkedVersionInfoCollectionLinks {
  /** Self link to the current page. */
  self: ApiLink;
  /** Link to the first page. */
  first: ApiLink;
  /** Link to the previous page. */
  prev: ApiLink;
  /** Link to the next page. */
  next: ApiLink;
  /** Link to the last page. */
  last: ApiLink;
}
