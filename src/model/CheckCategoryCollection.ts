import { ApiLink } from "./ApiLink";
import { CheckCategory } from "./CheckCategory";

export interface CheckCategoryCollection {
  items: CheckCategory[];
  _links: CheckCategoryCollectionLinks;
}

export interface CheckCategoryCollectionLinks {
  self: ApiLink;
}
