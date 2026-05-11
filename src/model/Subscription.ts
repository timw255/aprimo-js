import { ApiLink } from "./ApiLink";

/**
 * Representation of a subscription.
 */
export interface Subscription {
  /** The Aprimo User Id of this subscription. Format: int32. */
  aprimoUserId: number;
  /** The creator id of this subscription. */
  createdBy: string;
  /** The date when this subscription was created. Format: date-time. */
  createdOn: string;
  /** The Id of this subscription. */
  id: string;
  /** The modifier id of this subscription. */
  modifiedBy: string;
  /** The date when this subscription was updated. Format: date-time. */
  modifiedOn: string;
  /** The Record Id of this subscription. */
  objectId: string;
  /**
   * The Type of this subscription object.
   */
  subscriptionObjectType: "Record" | "Collection";
  /**
   * The Type of this subscription.
   */
  subscriptionType: "Follow" | "Expiry";
  /** The User Id of this subscription. */
  userId: string;
  _links: SubscriptionLinks;
}

export interface SubscriptionLinks {
  self: ApiLink;
}
