import { ApiLink } from "./ApiLink";
import { CheckFinding } from "./CheckFinding";

export interface CheckFindingCollection {
  items: CheckFinding[];
  _links: CheckFindingCollectionLinks;
}

export interface CheckFindingCollectionLinks {
  self: ApiLink;
}
