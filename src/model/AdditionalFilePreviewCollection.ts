import { AdditionalFilePreview } from "./AdditionalFilePreview";
import { ApiLink } from "./ApiLink";

/**
 * Representation of a non-paged collection of AdditionalFilePreview items.
 */
export interface AdditionalFilePreviewCollection {
  /**
   * A collection of additional file preview items.
   */
  items: AdditionalFilePreview[];
  /**
   * HAL `_links` for this collection.
   */
  _links: AdditionalFilePreviewCollectionLinks;
}

/**
 * HAL link relations for an {@link AdditionalFilePreviewCollection}.
 */
export interface AdditionalFilePreviewCollectionLinks {
  /** Self link. */
  self: ApiLink;
}
