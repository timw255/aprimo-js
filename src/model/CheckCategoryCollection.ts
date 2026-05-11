import { ApiLink } from "./ApiLink";
import { CheckCategory } from "./CheckCategory";

/**
 * Representation of a collection of Check Categories.
 */
export interface CheckCategoryCollection {
  /** Gets the collection of check category resources. */
  items: CheckCategory[];
  _links: CheckCategoryCollectionLinks;
}

export interface CheckCategoryCollectionLinks {
  self: ApiLink;
}
