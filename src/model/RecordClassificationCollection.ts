import { ApiLink } from "./ApiLink";
import { RecordClassification } from "./RecordClassification";

export interface RecordClassificationCollection {
  items: RecordClassification[];
  _links: RecordClassificationCollectionLinks;
}

export interface RecordClassificationCollectionLinks {
  self: ApiLink;
}
