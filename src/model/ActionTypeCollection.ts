import { ActionType } from "./ActionType";
import { ApiLink } from "./ApiLink";

/**
 * Representation of a collection of check action types.
 */
export interface ActionTypeCollection {
  /** Gets the collection of action type resources. */
  items: ActionType[];
  _links: ActionTypeCollectionLinks;
}

export interface ActionTypeCollectionLinks {
  self: ApiLink;
}
