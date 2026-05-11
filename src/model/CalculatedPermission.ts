import { ApiLink } from "./ApiLink";

/**
 * Represents the calculated permission in case of permission conflicts between a user and the user group he is
 * member of. In this case, ADAM calculates the permission and it can be retrieved at this endpoint.
 */
export interface CalculatedPermission {
  /** Gets the name of this permission. */
  name: string;
  /**
   * Gets the value of this permission.
   */
  value: "None" | "Granted" | "Denied";
  /** HAL links for this calculated permission. */
  _links: CalculatedPermissionLinks;
}

/**
 * HAL links for a {@link CalculatedPermission}.
 */
export interface CalculatedPermissionLinks {
  /** Link to this calculated permission. */
  self: ApiLink;
}
