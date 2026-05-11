import { ApiLink } from "./ApiLink";
import { CollectionContentPermission } from "./CollectionContentPermission";
import { CollectionGroupPermission } from "./CollectionGroupPermission";
import { CollectionUserPermission } from "./CollectionUserPermission";

/**
 * Representation of a set of permissions for a collection. Includes user permissions,
 * group permissions, public access, and content sharing settings.
 */
export interface CollectionPermissions {
  /** Indicates whether the current user has modify permissions on this collection. */
  canModify: boolean;
  /** Indicates whether the current user has read permissions on this collection. */
  canRead: boolean;
  /** Content sharing settings for this collection. */
  contentPermission: CollectionContentPermission | null;
  /** List of assigned permissions per user group for this collection. */
  groupsPermissions: CollectionGroupPermission[];
  /** List of assigned permissions per user for this collection. */
  permissions: CollectionUserPermission[];
  /**
   * Public permission level for this collection.
   * - `None`: Collection is not publicly accessible
   * - `Read`: Collection is publicly readable (Modify not supported for public access)
   */
  publicPermission: "None" | "Read";
  /** HAL links for this permission set. */
  _links: CollectionPermissionsLinks;
}

/**
 * HAL links for a {@link CollectionPermissions}.
 */
export interface CollectionPermissionsLinks {
  /** Link to this permission set. */
  self: ApiLink;
}
