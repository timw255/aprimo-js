import { ApiLink } from "./ApiLink";
import { Label } from "./Label";

/**
 * Representation of a Permission.
 */
export interface Permission {
  /** Collection of localized labels for this permission. */
  labels: Label[];
  /** Gets the name of this permission. */
  name: string;
  /** HAL links for this permission. */
  _links: PermissionLinks;
}

/**
 * HAL links for a {@link Permission}.
 */
export interface PermissionLinks {
  /** Link to this permission. */
  self: ApiLink;
}
