import { ApiLink } from "./ApiLink";
import { OrderTargetStatus } from "./OrderTarget";

/**
 * Representation of a record maintenance target.
 */
export interface RecordMaintenanceTarget {
  /** Value indicating how many times the maintenance manager has already tried to execute this target. Format: int32. */
  attempt: number;
  /** Detailed information about the error that occurred if this target failed to execute successfully. */
  errorDetails: string;
  /** The amount of time needed to execute this target. */
  executionTime: string;
  /** Value indicating whether or not a new maintenance job will be created to retry this target after it finished its execution. */
  forceRetry: boolean;
  /** The Id of this target. */
  id: string;
  /** The message that was set during the execution of this target. */
  message: string;
  /** The Id of the Record this target represents. */
  recordId: string;
  /**
   * The status of this target.
   */
  status: OrderTargetStatus;
  /** Gets the tag. */
  tag: string;
  _links: RecordMaintenanceTargetLinks;
}

export interface RecordMaintenanceTargetLinks {
  self: ApiLink;
}
