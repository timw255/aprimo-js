import { ApiLink } from "./ApiLink";
import { FileVersion } from "./FileVersion";

/**
 * Paginated collection of file versions.
 */
export interface FileVersionCollection {
  /**
   * One page of file versions.
   */
  items: FileVersion[];
  /** The current page number (1-based). */
  page: number;
  /** The number of items per page. */
  pageSize: number;
  /** The total number of items across all pages. */
  totalCount: number;
  /**
   * HAL `_links` for this collection.
   */
  _links: FileVersionCollectionLinks;
}

/**
 * HAL link relations for a {@link FileVersionCollection}.
 */
export interface FileVersionCollectionLinks {
  /** Self link. */
  self: ApiLink;
}
