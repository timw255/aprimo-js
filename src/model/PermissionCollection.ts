import { ApiLink } from "./ApiLink";
import { Permission } from "./Permission";

/**
 * Representation of a non-paged collection of Permission items.
 */
export interface PermissionCollection {
  /** A collection of permission items. */
  items: Permission[];
  /** HAL links for this collection. */
  _links: PermissionCollectionLinks;
}

/**
 * HAL links for a {@link PermissionCollection}.
 */
export interface PermissionCollectionLinks {
  /** Link to this collection. */
  self: ApiLink;
}
