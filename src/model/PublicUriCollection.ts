import { ApiLink } from "./ApiLink";
import { PublicUri } from "./PublicUri";

/**
 * Representation of a non-paged collection of PublicUri items.
 */
export interface PublicUriCollection {
  /** A collection of public URI items. */
  items: PublicUri[];
  _links: PublicUriCollectionLinks;
}

export interface PublicUriCollectionLinks {
  self: ApiLink;
}
