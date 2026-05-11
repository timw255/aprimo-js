import { ApiLink } from "./ApiLink";
import { MaintenanceJobStatus } from "./MaintenanceJob";
import { OrderTargetCollection } from "./OrderTargetCollection";
import { User } from "./User";

/**
 * Representation of a brand template order. (Spec description reads
 * "public cdn order" — likely a copy-paste artefact in the spec.)
 */
export interface BrandTemplateOrder {
  /** Gets the creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** E-mail address for this job. */
  creatorEmail: string;
  /** The brand template customization id. */
  customizationId: string;
  /** List of files delivered by the order to the client. */
  deliveredFiles: string[];
  /** Value indicating whether or not notification is enabled on this job. */
  disableNotification: boolean;
  /** The earliest date in utc time on which this job can be executed. */
  earliestStartDate: string | null;
  /** Gets the time it took for this maintenance job to execute. */
  executionTime: string;
  /** Gets the count of the failed targets. Format: int32. */
  failedTargetsCount: number;
  /** Gets the Id of this maintenance job. */
  id: string;
  /** Gets the error message that describes why this maintenance job failed. */
  message: string | null;
  /** Gets the type of the order. */
  orderType: string;
  /** Collection of requested presets. */
  presets: string[];
  /** Priority of this job. */
  priority: number;
  /** Gets the time on which the execution of this maintenance job started in utc time. */
  startedOn: string | null;
  /** Status of this job. */
  status: MaintenanceJobStatus;
  /** Total file size of the delivered files. Format: int64. */
  totalFileSize: number;
  /** Gets the name of this maintenance job. */
  type: string;
  /** HAL-style links for this resource. */
  _links: BrandTemplateOrderLinks;
  /** Resources embedded inline by the API for `_links` entries other than `self`. */
  _embedded?: {
    [K in Exclude<
      keyof BrandTemplateOrderLinks,
      "self"
    >]?: BrandTemplateOrderLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL links for a brand template order resource.
 */
export interface BrandTemplateOrderLinks {
  /** Link pointing back at this order. */
  self: ApiLink;
  /** Link to the collection of order targets. */
  targets: ApiLink<OrderTargetCollection>;
  /** Link to the user that created this order. */
  createdby: ApiLink<User>;
}
