import { ApiLink } from "./ApiLink";
import { MaintenanceJobStatus } from "./MaintenanceJob";
import { OrderTargetCollection } from "./OrderTargetCollection";
import { User } from "./User";

/**
 * Representation of a shareable download link order.
 */
export interface ShareDownloadLinkOrder {
  /** Gets the creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** E-mail address for this job. */
  creatorEmail: string;
  /** List of files delivered by the order to the client. */
  deliveredFiles: string[];
  /** Value indicating whether or not notification is enabled on this job. */
  disableNotification: boolean;
  /** The earliest date in utc time on which this job can be executed. Format: date-time. */
  earliestStartDate: string;
  /** The body of the mail. */
  emailBody: string;
  /** Collection of email addresses to send the mail to. Format: email. */
  emailRecipients: string[];
  /** Gets the time it took for this maintenance job to execute. */
  executionTime: string;
  /** Gets the count of the failed targets. Format: int32. */
  failedTargetsCount: number;
  /** Gets the Id of this maintenance job. */
  id: string;
  /** Gets the error message that describes why this maintenance job failed. Returns null if this maintenance job hasn't been executed yet. */
  message: string;
  /** Gets the type of the order. */
  orderType: string;
  /** Priority of this job. */
  priority: number;
  /** True if the mail should be sent to the recipients. */
  sendEmail: boolean;
  /** The id of the shared download link. */
  sharedDownloadLinkId: string;
  /** The shareable link. */
  shareUri: string;
  /** Gets the time on which the execution of this maintenance job started in utc time. Format: date-time. */
  startedOn: string;
  /** Status of this job. */
  status: MaintenanceJobStatus;
  /** Total file size of the delivered files. Format: int64. */
  totalFileSize: number;
  /** Gets the name of this maintenance job. */
  type: string;
  /** HAL-style links for this resource. */
  _links: ShareDownloadLinkOrderLinks;
  /** Resources embedded inline by the API for `_links` entries other than `self`. */
  _embedded?: {
    [K in Exclude<
      keyof ShareDownloadLinkOrderLinks,
      "self"
    >]?: ShareDownloadLinkOrderLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL links for a shareable download link order resource.
 */
export interface ShareDownloadLinkOrderLinks {
  /** Link pointing back at this order. */
  self: ApiLink;
  /** Link to the collection of order targets. */
  targets: ApiLink<OrderTargetCollection>;
  /** Link to the user that created this order. */
  createdby: ApiLink<User>;
}
