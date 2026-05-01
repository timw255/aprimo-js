import { ApiLink } from "./ApiLink";

export interface Check {
  id: string;
  name: string;
  actionTypeId: string;
  checkCategoryId: string;
  _links: CheckLinks;
}

export interface CheckLinks {
  self: ApiLink;
}
