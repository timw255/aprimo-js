import { ApiLink } from "./ApiLink";
import { CalculatedPermission } from "./CalculatedPermission";

/**
 * Representation of a non-paged collection of CalculatedPermission items.
 */
export interface CalculatedPermissionCollection {
  /** A collection of calculated permission items. */
  items: CalculatedPermission[];
  /** HAL links for this collection. */
  _links: CalculatedPermissionCollectionLinks;
}

/**
 * HAL links for a {@link CalculatedPermissionCollection}.
 */
export interface CalculatedPermissionCollectionLinks {
  /** Link to this collection. */
  self: ApiLink;
}
