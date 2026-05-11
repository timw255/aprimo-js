import { ApiLink } from "./ApiLink";
import { File } from "./File";

/**
 * Paginated collection of files.
 */
export interface FileCollection {
  /**
   * One page of files.
   */
  items: File[];
  /** The current page number (1-based). */
  page: number;
  /** The number of items per page. */
  pageSize: number;
  /** The total number of items across all pages. */
  totalCount: number;
  /**
   * HAL `_links` for this collection.
   */
  _links: FileCollectionLinks;
}

/**
 * HAL link relations for a {@link FileCollection}.
 */
export interface FileCollectionLinks {
  /** Self link. */
  self: ApiLink;
}
