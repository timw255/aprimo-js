import { ApiLink } from "./ApiLink";
import { OrderTargetStatus } from "./OrderTarget";

/**
 * Representation of a classification maintenance target.
 */
export interface ClassificationMaintenanceTarget {
  /** Value indicating how many times the maintenance manager has already tried to execute this target. Format: int32. */
  attempt: number;
  /** The Id of the Classification this target represents. */
  classificationId: string;
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
  /**
   * The status of this target.
   */
  status: OrderTargetStatus;
  /** The tag. */
  tag: string;
  /** HAL-style hypermedia links for this resource. */
  _links: ClassificationMaintenanceTargetLinks;
}

/** HAL-style link relations exposed on a ClassificationMaintenanceTarget. */
export interface ClassificationMaintenanceTargetLinks {
  /** Self link to this target. */
  self: ApiLink;
}
