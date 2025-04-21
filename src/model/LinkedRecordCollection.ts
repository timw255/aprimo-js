import { ApiLink } from "./ApiLink";
import { LinkedRecord } from "./LinkedRecord";

export interface LinkedRecordCollection {
  items: LinkedRecord[];
  _links: LinkedRecordCollectionLinks;
}

export interface LinkedRecordCollectionLinks {
  self: ApiLink;
}
