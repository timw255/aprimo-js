import { ApiLink } from "./ApiLink";
import { OrderTargetStatus } from "./OrderTarget";

/**
 * Representation of an export metadata download link target.
 */
export interface ExportMetadataDownloadLinkTarget {
  /** The Id of this target. */
  id: string;
  /** Record Id that represents this maintenance target. */
  objectId: string;
  /**
   * The status of this target.
   */
  status: OrderTargetStatus;
  _links: ExportMetadataDownloadLinkTargetLinks;
}

export interface ExportMetadataDownloadLinkTargetLinks {
  self: ApiLink;
}
