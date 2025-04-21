import { ApiLink } from "./ApiLink";

export interface Null {
  _links: NullLinks;
}

export interface NullLinks {
  self: ApiLink;
}
