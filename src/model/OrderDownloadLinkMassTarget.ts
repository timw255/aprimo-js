import { ApiLink } from "./ApiLink";
import { OrderTargetAssetType, OrderTargetStatus } from "./OrderTarget";

/**
 * Representation of an order target with mass record ids for download link — used when a download
 * order is submitted without preliminary checks and a single target represents many records.
 */
export interface OrderDownloadLinkMassTarget {
  /** User friendly message in case of error. */
  errorDescription: string;
  /** Collection of errors for each target. */
  errors: object[];
  /** The Id of the Record file version this target represents. */
  fileVersionId: string;
  /** The Id of this target. */
  id: string;
  /** The Id of the Record this target represents. */
  recordId: string;
  /** IDs of the records that this target represents, for download orders submitted without preliminary checks. */
  recordIds: string[];
  /**
   * The status of this target.
   */
  status: OrderTargetStatus;
  /**
   * Type of the target.
   */
  targetType: OrderTargetAssetType;
  _links: OrderDownloadLinkMassTargetLinks;
}

export interface OrderDownloadLinkMassTargetLinks {
  self: ApiLink;
}
