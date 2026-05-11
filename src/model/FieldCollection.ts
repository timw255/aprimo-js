import { ApiLink } from "./ApiLink";

/**
 * Representation of a non-paged collection of field items.
 */
export interface FieldCollection {
  /** A collection of field items (can be any field type). */
  items: object[];
  _links: FieldCollectionLinks;
}

export interface FieldCollectionLinks {
  self: ApiLink;
}
