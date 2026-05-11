import { ApiLink } from "./ApiLink";
import { LinkedClassification } from "./LinkedClassification";

/**
 * Representation of a non-paged collection of LinkedClassification items.
 */
export interface LinkedClassificationCollection {
  /** A collection of linked classification items. */
  items: LinkedClassification[];
  /** HAL-style hypermedia links for this collection. */
  _links: LinkedClassificationCollectionLinks;
}

/** HAL-style link relations exposed on a LinkedClassificationCollection. */
export interface LinkedClassificationCollectionLinks {
  /** Self link to this collection. */
  self: ApiLink;
}
