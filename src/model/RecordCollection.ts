import { ApiLink } from "./ApiLink";
import { Record } from "./Record";

/**
 * Representation of a non-paged collection of Record items.
 *
 * Some endpoints return a paged variant instead, carrying `page`, `pageSize`
 * and `totalCount`; those are typed as {@link PagedCollection}.
 */
export interface RecordCollection {
  /** A collection of record items. */
  items: Record[];
  _links: RecordCollectionLinks;
}

export interface RecordCollectionLinks {
  self: ApiLink;
}
