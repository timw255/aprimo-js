import { ApiLink } from "./ApiLink";
import { Order } from "./Order";

/**
 * Non-paged collection of orders.
 */
export interface OrderCollection {
  /** The orders contained in this collection. */
  items: Order[];
  /** HAL-style links for this collection. */
  _links: OrderCollectionLinks;
}

/**
 * HAL links describing the order collection resource.
 */
export interface OrderCollectionLinks {
  /** Link pointing back at this collection. */
  self: ApiLink;
}
