import { ApiLink } from "./ApiLink";
import { MaintenanceJobStatus } from "./MaintenanceJob";
import { OrderTargetCollection } from "./OrderTargetCollection";
import { User } from "./User";

/**
 * Representation of a public CDN order.
 *
 * Pass an {@link Expander} chain `for<PublicCdnOrder>("PublicCdnOrder")` to
 * populate related resources under `_embedded`. Expandable keys: `targets`,
 * `createdby`.
 */
export interface PublicCdnOrder {
  /** Gets the creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** E-mail address for this job. */
  creatorEmail: string;
  /** Collection of delivered files with related target properties. */
  deliveredFiles: object[];
  /** Value indicating whether or not notification is enabled on this job. */
  disableNotification: boolean;
  /** The earliest date in utc time on which this job can be executed. Format: date-time. */
  earliestStartDate: string | null;
  /** Gets the time it took for this order to execute. */
  executionTime: string;
  /** Gets the count of the failed targets. Format: int32. */
  failedTargetsCount: number;
  /** Gets the Id of this order. */
  id: string;
  /** Gets the error message that describes why this order failed. */
  message: string | null;
  /** Gets the type of the order. */
  orderType: string;
  /** Priority of this order. */
  priority: number;
  /** Gets the time on which the execution of this order started in utc time. Format: date-time. */
  startedOn: string | null;
  /**
   * Gets the status of this order.
   */
  status: MaintenanceJobStatus;
  /** Total file size of the delivered files. Format: int64. */
  totalFileSize: number;
  /** Gets the name of this order. */
  type: string;
  _links: PublicCdnOrderLinks;
  _embedded?: {
    [K in Exclude<
      keyof PublicCdnOrderLinks,
      "self"
    >]?: PublicCdnOrderLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL links for a public CDN order resource.
 */
export interface PublicCdnOrderLinks {
  /** Link pointing back at this order. */
  self: ApiLink;
  /** Link to the collection of order targets. */
  targets: ApiLink<OrderTargetCollection>;
  /** Link to the user that created this order. */
  createdby: ApiLink<User>;
}
