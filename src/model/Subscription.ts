import { ApiLink } from "./ApiLink";

export interface Subscription {
  aprimoUserId: number;
  createdBy: string;
  createdOn: string;
  id: string;
  modifiedBy: string;
  modifiedOn: string;
  objectId: string;
  subscriptionObjectType: string;
  subscriptionType: string;
  userId: string;
  _links: SubscriptionLinks;
}

export interface SubscriptionLinks {
  self: ApiLink;
}
