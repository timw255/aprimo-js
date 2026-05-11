import { ApiLink } from "./ApiLink";
import { CheckFinding } from "./CheckFinding";

/**
 * Representation of a collection of check result findings.
 */
export interface CheckFindingCollection {
  items: CheckFinding[];
  _links: CheckFindingCollectionLinks;
}

export interface CheckFindingCollectionLinks {
  self: ApiLink;
}
