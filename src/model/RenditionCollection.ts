import { ApiLink } from "./ApiLink";
import { Rendition } from "./Rendition";

/**
 * Representation of a non-paged collection of Rendition items.
 */
export interface RenditionCollection {
  /**
   * A collection of rendition items.
   */
  items: Rendition[];
  /**
   * HAL `_links` for this collection.
   */
  _links: RenditionCollectionLinks;
}

/**
 * HAL link relations for a {@link RenditionCollection}.
 */
export interface RenditionCollectionLinks {
  /** Self link. */
  self: ApiLink;
}
