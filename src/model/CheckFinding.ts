import { ApiLink } from "./ApiLink";
import { CheckOutcome } from "./CheckResult";

export interface CheckFinding {
  id: string;
  occurrence: number;
  finding: string;
  explanation?: string;
  recommendation?: string;
  outcome: CheckOutcome;
  _links: CheckFindingLinks;
}

export interface CheckFindingLinks {
  self: ApiLink;
}
