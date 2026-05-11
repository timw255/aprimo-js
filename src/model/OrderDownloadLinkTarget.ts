import { ApiLink } from "./ApiLink";
import { OrderTargetAssetType, OrderTargetStatus } from "./OrderTarget";

/**
 * Representation of an order target of a download link.
 */
export interface OrderDownloadLinkTarget {
  /** User friendly message in case of error. */
  errorDescription: string;
  /** The Id of the Record file version this target represents. */
  fileVersionId: string;
  /** The Id of this target. */
  id: string;
  /** The Id of the Record this target represents. */
  recordId: string;
  /**
   * The status of this target.
   */
  status: OrderTargetStatus;
  /**
   * Type of the target.
   */
  targetType: OrderTargetAssetType;
  _links: OrderDownloadLinkTargetLinks;
}

export interface OrderDownloadLinkTargetLinks {
  self: ApiLink;
}
