import { ApiLink } from "./ApiLink";

/**
 * Representation of the definition of a PermissionValue.
 */
export interface PermissionValue {
  /** Gets the name of this permission. */
  name: string;
  /**
   * Gets the value of this permission.
   */
  value: "None" | "Granted" | "Denied";
  /** HAL links for this permission value. */
  _links: PermissionValueLinks;
}

/**
 * HAL links for a {@link PermissionValue}.
 */
export interface PermissionValueLinks {
  /** Link to this permission value. */
  self: ApiLink;
}
