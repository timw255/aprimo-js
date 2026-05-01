import { ApiLink } from "./ApiLink";
import { CheckResult } from "./CheckResult";

export interface CheckResultCollection {
  items: CheckResult[];
  _links: CheckResultCollectionLinks;
}

export interface CheckResultCollectionLinks {
  self: ApiLink;
}
