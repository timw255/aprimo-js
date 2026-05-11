import { ApiLink } from "./ApiLink";
import { OrderTargetAction } from "./OrderTargetAction";

/**
 * Status of an order target or download-link target.
 */
export type OrderTargetStatus =
  | "pending"
  | "succeeded"
  | "failed"
  | "partiallyfailed";

/**
 * Asset type of an order target.
 */
export type OrderTargetAssetType =
  | "version"
  | "preview"
  | "thumbnail"
  | "custom"
  | "additionalfile";

/**
 * Representation of an order target — a single file/record entry produced
 * by an order, including its execution status, retry information and the
 * collection of actions that were applied to the delivered file.
 */
export interface OrderTarget {
  /** Identifier of the additional file this target represents, if any. */
  additionalFileId: string;
  /** Collection of actions that are executed on the ordered file. */
  actions: OrderTargetAction[];
  /** Asset type the order target was generated from. */
  assetType: string;
  /** Value indicating how many times the maintenance manager has already tried to execute this target. Format: int32. */
  attempt: number;
  /** Detailed information about the error that occurred if this target failed to execute successfully. */
  errorDetails: string;
  /** The amount of time needed to execute this target. */
  executionTime: string;
  /** The filename of the delivered file. */
  fileName: string;
  /** Value indicating whether or not a new maintenance job will be created to retry this target after it finished its execution. */
  forceRetry: boolean;
  /** The Id of this target. */
  id: string;
  /** The Id of the object (Version, Preview, Thumbnail, Custom, AdditionalFile) this target represents. */
  itemId: string;
  /** The message that was set during the execution of this target. */
  message: string;
  /** The Id of the Record this target represents. */
  recordId: string;
  /** Record IDs for mass target. */
  recordIds: string[];
  /** The status of this target. */
  status: OrderTargetStatus;
  /** Gets the tag. */
  tag: string;
  /** Per-target list of target types. */
  targetTypes: string[];
  /** The asset type of this target. */
  type: OrderTargetAssetType;
  /** HAL-style links for this resource. */
  _links: OrderTargetLinks;
}

/**
 * HAL links for an order target resource.
 */
export interface OrderTargetLinks {
  /** Link pointing back at this target. */
  self: ApiLink;
}
