import { ApiLink } from "./ApiLink";
import { RecordAccessList } from "./RecordAccessList";

export interface RecordAccessListCollection {
  items: RecordAccessList[];
  _links: RecordAccessListCollectionLinks;
}

export interface RecordAccessListCollectionLinks {
  self: ApiLink;
}
