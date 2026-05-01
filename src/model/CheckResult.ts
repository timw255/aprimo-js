import { ApiLink } from "./ApiLink";
import { CheckFindingCollection } from "./CheckFindingCollection";

export type CheckOutcome = "pass" | "fail" | "warning" | "info";

export interface CheckResult {
  id: string;
  checkId: string;
  outcome: CheckOutcome;
  description: string;
  createdOn: string;
  _links: CheckResultLinks;
  _embedded?: {
    [K in Exclude<keyof CheckResultLinks, "self">]?: CheckResultLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface CheckResultLinks {
  self: ApiLink;
  findings: ApiLink<CheckFindingCollection>;
}
