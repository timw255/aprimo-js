import { ApiLink } from "./ApiLink";

export interface ContentTypeInheritableFieldCollection {
  items: object[];
  _links: ContentTypeInheritableFieldCollectionLinks;
}

export interface ContentTypeInheritableFieldCollectionLinks {
  self: ApiLink;
}
