import { ApiLink } from "./ApiLink";
import { OrderTargetStatus } from "./OrderTarget";

/**
 * Representation of an export audit download link target.
 */
export interface ExportAuditDownloadLinkTarget {
  /** The Id of this target. */
  id: string;
  /** id of a record this target represents. */
  recordId: string;
  /**
   * The status of this target.
   */
  status: OrderTargetStatus;
  _links: ExportAuditDownloadLinkTargetLinks;
}

export interface ExportAuditDownloadLinkTargetLinks {
  self: ApiLink;
}
