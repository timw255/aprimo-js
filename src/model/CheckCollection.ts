import { ApiLink } from "./ApiLink";
import { Check } from "./Check";

export interface CheckCollection {
  items: Check[];
  _links: CheckCollectionLinks;
}

export interface CheckCollectionLinks {
  self: ApiLink;
}
