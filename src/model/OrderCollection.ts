import { ApiLink } from "./ApiLink";
import { Order } from "./Order";

export interface OrderCollection {
  items: Order[];
  _links: OrderCollectionLinks;
}

export interface OrderCollectionLinks {
  self: ApiLink;
}
