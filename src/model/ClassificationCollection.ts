import { ApiLink } from "./ApiLink";
import { Classification } from "./Classification";

/**
 * Representation of a non-paged collection of Classification items.
 */
export interface ClassificationCollection {
  /** A collection of classification items. */
  items: Classification[];
  /** HAL-style hypermedia links for this collection. */
  _links: ClassificationCollectionLinks;
}

/** HAL-style link relations exposed on a ClassificationCollection. */
export interface ClassificationCollectionLinks {
  /** Self link to this collection. */
  self: ApiLink;
}
