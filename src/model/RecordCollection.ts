import { ApiLink } from "./ApiLink";
import { Record } from "./Record";

/**
 * Representation of a non-paged collection of Record items.
 *
 * Note: the spec also defines a `Recordpagedcollection` (with `page`,
 * `pageSize`, `totalCount`); this SDK type maps to the non-paged variant.
 */
export interface RecordCollection {
  /** A collection of record items. */
  items: Record[];
  _links: RecordCollectionLinks;
}

export interface RecordCollectionLinks {
  self: ApiLink;
}
