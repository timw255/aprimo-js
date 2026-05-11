import { ApiLink } from "./ApiLink";
import { PublicLink } from "./PublicLink";

/**
 * Representation of a non-paged collection of PublicLink items.
 */
export interface PublicLinkCollection {
  /** A collection of public link items. */
  items: PublicLink[];
  _links: PublicLinkCollectionLinks;
}

export interface PublicLinkCollectionLinks {
  self: ApiLink;
}
