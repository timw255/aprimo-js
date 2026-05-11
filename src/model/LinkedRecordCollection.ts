import { ApiLink } from "./ApiLink";
import { LinkedRecord } from "./LinkedRecord";

/**
 * Representation of a non-paged collection of LinkedRecord items.
 */
export interface LinkedRecordCollection {
  /** A collection of linked record items. */
  items: LinkedRecord[];
  /** HAL-style hypermedia links for this collection. */
  _links: LinkedRecordCollectionLinks;
}

/** HAL-style link relations exposed on a LinkedRecordCollection. */
export interface LinkedRecordCollectionLinks {
  /** Self link to this collection. */
  self: ApiLink;
}
