import { ApiLink } from "./ApiLink";

/**
 * Representation of an ancestor of a single Record.
 */
export interface LinkedRecord {
  /** The depth of the linked record. The depth of the top level classification is 0. Format: int32. */
  depth: number;
  /** The id of the linked record (provides a link to this resource). */
  id: string;
  /** HAL-style hypermedia links for this resource. */
  _links: LinkedRecordLinks;
}

/** HAL-style link relations exposed on a LinkedRecord. */
export interface LinkedRecordLinks {
  /** Self link to this linked record. */
  self: ApiLink;
}
