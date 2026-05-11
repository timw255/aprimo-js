import { ApiLink } from "./ApiLink";
import { CheckResult } from "./CheckResult";

/**
 * Representation of a collection of check results.
 */
export interface CheckResultCollection {
  items: CheckResult[];
  _links: CheckResultCollectionLinks;
}

export interface CheckResultCollectionLinks {
  self: ApiLink;
}
