import { ApiLink } from "./ApiLink";

export interface CheckCategory {
  id: string;
  name: string;
  _links: CheckCategoryLinks;
}

export interface CheckCategoryLinks {
  self: ApiLink;
}
