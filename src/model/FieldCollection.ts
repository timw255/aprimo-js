import { ApiLink } from "./ApiLink";

export interface FieldCollection {
  items: object[];
  _links: FieldCollectionLinks;
}

export interface FieldCollectionLinks {
  self: ApiLink;
}
