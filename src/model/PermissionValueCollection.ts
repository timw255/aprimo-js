import { ApiLink } from "./ApiLink";
import { PermissionValue } from "./PermissionValue";

/**
 * Representation of a non-paged collection of PermissionValue items.
 */
export interface PermissionValueCollection {
  /** A collection of permission value items. */
  items: PermissionValue[];
  /** HAL links for this collection. */
  _links: PermissionValueCollectionLinks;
}

/**
 * HAL links for a {@link PermissionValueCollection}.
 */
export interface PermissionValueCollectionLinks {
  /** Link to this collection. */
  self: ApiLink;
}
