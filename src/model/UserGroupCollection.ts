import { ApiLink } from "./ApiLink";
import { UserGroup } from "./UserGroup";

/**
 * Representation of a non-paged collection of UserGroup items.
 */
export interface UserGroupCollection {
  /** A collection of user group items. */
  items: UserGroup[];
  /** HAL links for this collection. */
  _links: UserGroupCollectionLinks;
}

/**
 * HAL links for a {@link UserGroupCollection}.
 */
export interface UserGroupCollectionLinks {
  /** Link to this collection. */
  self: ApiLink;
}
