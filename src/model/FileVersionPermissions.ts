import { ApiLink } from "./ApiLink";

/**
 * Representation of the permissions on a FileVersion.
 */
export interface FileVersionPermissions {
  /**
   * Indicates whether the current user has download permissions on this object.
   */
  canDownload: boolean;
  /**
   * HAL `_links` for this resource.
   */
  _links: FileVersionPermissionsLinks;
}

/**
 * HAL link relations for {@link FileVersionPermissions}.
 */
export interface FileVersionPermissionsLinks {
  /** Self link. */
  self: ApiLink;
}
