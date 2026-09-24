import { ApiLink } from "./ApiLink";
import { CheckOutcome } from "./CheckResult";

/**
 * Representation of a check result finding. Contains detailed findings from running a check on a
 * file version (a single observation produced by a check execution).
 *
 * Findings have no id of their own — they are identified within their check result by
 * {@link CheckFinding.occurrence}, which is what the finding endpoints take as their
 * path parameter.
 */
export interface CheckFinding {
  /** Additional data related to the finding, as a serialized JSON document. */
  additionalData?: string | null;
  /** Explanation of the finding. Supports Markdown, including links. */
  explanation?: string;
  /** ID of the file version check result this finding belongs to. */
  fileVersionCheckId: string;
  /**
   * The flagged content itself, e.g. a specific flagged sentence. Does not support Markdown.
   */
  finding: string;
  /** Occurrence number of this finding within its check result. Format: int32. */
  occurrence: number;
  /** Outcome of the finding. */
  outcome: CheckOutcome;
  /** Recommendation for addressing the finding. Supports Markdown, including links. */
  recommendation?: string;
  _links: CheckFindingLinks;
}

export interface CheckFindingLinks {
  self: ApiLink;
}
