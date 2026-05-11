import { ApiLink } from "./ApiLink";
import { CheckFindingCollection } from "./CheckFindingCollection";

/**
 * Outcome of a check or finding. Narrowed by the SDK; the spec models this as a free-form string.
 */
export type CheckOutcome = "pass" | "fail" | "warning" | "info";

/**
 * Representation of a check result. Contains the result of running a check on a specific file
 * version. Each CheckResult belongs to a Check (via `checkId`) and may contain many CheckFindings
 * accessible through `_links.findings`.
 */
export interface CheckResult {
  /** ID of the check that was executed. */
  checkId: string;
  /** User that created this resource. */
  createdBy: string;
  /** Creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /**
   * Description of the check result.
   */
  description: string;
  /** ID of the file version this check result applies to. */
  fileVersionId: string;
  /** Unique identifier for this check result. */
  id: string;
  /**
   * Outcome of the check execution.
   */
  outcome: CheckOutcome;
  _links: CheckResultLinks;
  _embedded?: {
    [K in Exclude<keyof CheckResultLinks, "self">]?: CheckResultLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface CheckResultLinks {
  self: ApiLink;
  findings: ApiLink<CheckFindingCollection>;
}
