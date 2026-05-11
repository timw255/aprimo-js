import { AdditionalFile } from "./AdditionalFile";
import { ApiLink } from "./ApiLink";

/**
 * Representation of a non-paged collection of AdditionalFile items.
 */
export interface AdditionalFileCollection {
  /**
   * A collection of additional file items.
   */
  items: AdditionalFile[];
  /**
   * HAL `_links` for this collection.
   */
  _links: AdditionalFileCollectionLinks;
}

/**
 * HAL link relations for an {@link AdditionalFileCollection}.
 */
export interface AdditionalFileCollectionLinks {
  /** Self link. */
  self: ApiLink;
}
