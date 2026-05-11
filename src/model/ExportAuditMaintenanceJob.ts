import { ApiLink } from "./ApiLink";
import { MaintenanceJobStatus } from "./MaintenanceJob";
import { User } from "./User";

/**
 * Storage Class for Maintenance Job type ExportAuditMaintenanceJob.
 */
export interface ExportAuditMaintenanceJob {
  /** Gets the creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** E-mail address for this job. */
  creatorEmail: string;
  /** Holds the value of the DeliveredFile Path. */
  deliveredFile: string;
  /** Value indicating whether or not notification is enabled on this job. */
  disableNotification: boolean;
  /** The earliest date in utc time on which this job can be executed. Format: date-time. */
  earliestStartDate: string;
  /** Gets the time it took for this maintenance job to execute. */
  executionTime: string;
  /** Holds the value of the Exported Filename. */
  exportFileName: string;
  /** Gets the count of the failed targets. Format: int32. */
  failedTargetsCount: number;
  /** Gets the Id of this maintenance job. */
  id: string;
  /**
   * Gets the error message that describes why this maintenance job failed.
   * Returns null if this maintenance job hasn't been executed yet.
   */
  message: string;
  /**
   * Priority of this maintenance job.
   */
  priority: number;
  /** Gets the time on which the execution of this maintenance job started in utc time. Format: date-time. */
  startedOn: string;
  /**
   * Gets the status of this maintenance job.
   */
  status: MaintenanceJobStatus;
  /** Gets the name of this maintenance job. */
  type: string;
  _links: ExportAuditMaintenanceJobLinks;
  _embedded?: {
    [K in Exclude<
      keyof ExportAuditMaintenanceJobLinks,
      "self"
    >]?: ExportAuditMaintenanceJobLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface ExportAuditMaintenanceJobLinks {
  self: ApiLink;
  createdby: ApiLink<User>;
}
