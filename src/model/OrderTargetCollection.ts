import { ApiLink } from "./ApiLink";
import { OrderTarget } from "./OrderTarget";

/**
 * Representation of a non-paged collection of OrderTarget items.
 */
export interface OrderTargetCollection {
  /** A collection of order target items. */
  items: OrderTarget[];
  /** HAL-style links for this collection. */
  _links: OrderTargetCollectionLinks;
}

/**
 * HAL links for an order target collection resource.
 */
export interface OrderTargetCollectionLinks {
  /** Link pointing back at this collection. */
  self: ApiLink;
}
