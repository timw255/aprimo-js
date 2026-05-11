import { ApiLink } from "./ApiLink";
import { FilePreview } from "./FilePreview";

/**
 * Paginated collection of file previews.
 */
export interface FilePreviewCollection {
  /**
   * One page of file previews.
   */
  items: FilePreview[];
  /** The current page number (1-based). */
  page: number;
  /** The number of items per page. */
  pageSize: number;
  /** The total number of items across all pages. */
  totalCount: number;
  /**
   * HAL `_links` for this collection.
   */
  _links: FilePreviewCollectionLinks;
}

/**
 * HAL link relations for a {@link FilePreviewCollection}.
 */
export interface FilePreviewCollectionLinks {
  /** Self link. */
  self: ApiLink;
}
