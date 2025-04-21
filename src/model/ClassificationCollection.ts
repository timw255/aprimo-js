import { ApiLink } from "./ApiLink";
import { Classification } from "./Classification";

export interface ClassificationCollection {
  items: Classification[];
  _links: ClassificationCollectionLinks;
}

export interface ClassificationCollectionLinks {
  self: ApiLink;
}
