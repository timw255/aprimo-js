import { ApiLink } from "./ApiLink";
import { RecordClassification } from "./RecordClassification";

/**
 * Representation of a non-paged collection of RecordClassification items.
 */
export interface RecordClassificationCollection {
  /** A collection of record classification items. */
  items: RecordClassification[];
  _links: RecordClassificationCollectionLinks;
}

export interface RecordClassificationCollectionLinks {
  self: ApiLink;
}
