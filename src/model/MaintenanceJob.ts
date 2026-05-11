import { ApiLink } from "./ApiLink";
import { MaintenanceAction } from "./MaintenanceAction";
import { MaintenanceTargetCollection } from "./MaintenanceTargetCollection";
import { User } from "./User";

/**
 * Status of a maintenance job or order.
 */
export type MaintenanceJobStatus =
  | "Pending"
  | "Success"
  | "Failed"
  | "PartiallyFailed"
  | "Executing"
  | "Cancelled"
  | "Scheduled"
  | "Queued"
  | "AsyncPending"
  | "AsyncExecuting";

/**
 * Storage class for maintenance jobs in ADAM.
 *
 * Pass an {@link Expander} chain `for<MaintenanceJob>("MaintenanceJob")` to
 * populate related resources under `_embedded`. Expandable keys: `targets`,
 * `createdby`.
 */
export interface MaintenanceJob {
  /**
   * Collection of maintenance actions that this job should execute on all
   * specified targets.
   */
  actions: MaintenanceAction[];
  /** Gets the creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** E-mail address for this job. */
  creatorEmail: string;
  /** Value indicating whether or not notification is enabled on this job. */
  disableNotification: boolean;
  /** The earliest date in utc time on which this job can be executed. Format: date-time. */
  earliestStartDate: string | null;
  /** Collection of errors that occurred during execution of this maintenance job. */
  errors: object[] | null;
  /** Gets the time it took for this maintenance job to execute. */
  executionTime: string;
  /** Gets the count of the failed targets. Format: int32. */
  failedTargetsCount: number;
  /** Gets the Id of this maintenance job. */
  id: string;
  /** Gets the error message that describes why this maintenance job failed. */
  message: string | null;
  /** Priority of this maintenance job. */
  priority: number;
  /** Gets the time on which the execution of this maintenance job started in utc time. Format: date-time. */
  startedOn: string | null;
  /** Gets the count of the targets. Format: int32. */
  targetsCount: number;
  /**
   * Gets the status of this maintenance job.
   */
  status: MaintenanceJobStatus;
  /** Gets the name of this maintenance job. */
  type: string;
  _links: MaintenanceJobLinks;
  _embedded?: {
    [K in Exclude<
      keyof MaintenanceJobLinks,
      "self"
    >]?: MaintenanceJobLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface MaintenanceJobLinks {
  self: ApiLink;
  targets: ApiLink<MaintenanceTargetCollection>;
  createdby: ApiLink<User>;
}
