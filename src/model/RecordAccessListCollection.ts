import { ApiLink } from "./ApiLink";
import { RecordAccessList } from "./RecordAccessList";

/**
 * Representation of a non-paged collection of RecordAccessList items.
 */
export interface RecordAccessListCollection {
  /** A collection of record access list items. */
  items: RecordAccessList[];
  _links: RecordAccessListCollectionLinks;
}

export interface RecordAccessListCollectionLinks {
  self: ApiLink;
}
