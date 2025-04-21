import { ApiLink } from "./ApiLink";
import { OrderTarget } from "./OrderTarget";

export interface OrderTargetCollection {
  items: OrderTarget[];
  _links: OrderTargetCollectionLinks;
}

export interface OrderTargetCollectionLinks {
  self: ApiLink;
}
