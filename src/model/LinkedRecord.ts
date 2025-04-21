import { ApiLink } from "./ApiLink";

export interface LinkedRecord {
  depth: number;
  id: string;
  _links: LinkedRecordLinks;
}

export interface LinkedRecordLinks {
  self: ApiLink;
}
