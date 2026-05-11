import { ApiLink } from "./ApiLink";
import { CheckOutcome } from "./CheckResult";

/**
 * Representation of a check result finding. Contains detailed findings from running a check on a
 * file version (a single observation produced by a check execution).
 */
export interface CheckFinding {
  /** Additional data related to the finding. */
  additionalData: string;
  /** Explanation of the finding. */
  explanation?: string;
  /** ID of the file version check result this finding belongs to. */
  fileVersionCheckId: string;
  /** Description of the finding. */
  finding: string;
  /** Unique identifier for this finding. */
  id: string;
  /** Occurrence number of this finding. */
  occurrence: number;
  /** Outcome of the finding. */
  outcome: CheckOutcome;
  /** Recommendation for addressing the finding. */
  recommendation?: string;
  _links: CheckFindingLinks;
}

export interface CheckFindingLinks {
  self: ApiLink;
}
