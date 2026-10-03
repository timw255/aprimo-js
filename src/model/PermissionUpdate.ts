import { SetActions } from "./SetActions";

/**
 * A single permission assignment. Used for both user and user-group
 * permissions — the API takes the same shape for each.
 */
export interface PermissionUpdate {
  /** Permission name, e.g. `"EditRecords"`. */
  name: string;
  /** Whether the permission is granted, denied, or left unset. */
  value: "granted" | "denied" | "notset";
}

/**
 * Payload for `users.updatePermissions` and `userGroups.updatePermissions`.
 */
export interface UpdatePermissionsRequest {
  permissions: SetActions<PermissionUpdate>;
}
