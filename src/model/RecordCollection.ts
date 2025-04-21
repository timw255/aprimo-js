import { ApiLink } from "./ApiLink";
import { Record } from "./Record";

export interface RecordCollection {
  items: Record[];
  _links: RecordCollectionLinks;
}

export interface RecordCollectionLinks {
  self: ApiLink;
}
