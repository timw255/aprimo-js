import { ApiLink } from "./ApiLink";
import { Check } from "./Check";

/**
 * Representation of a Check Collection.
 */
export interface CheckCollection {
  /** Gets the collection of check resources. */
  items: Check[];
  _links: CheckCollectionLinks;
}

export interface CheckCollectionLinks {
  self: ApiLink;
}
