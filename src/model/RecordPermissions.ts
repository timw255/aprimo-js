import { ApiLink } from "./ApiLink";

/**
 * Representation of the permissions on a Record.
 */
export interface RecordPermissions {
  /** Indicates whether the current user has delete permissions on this object. */
  canDelete: boolean;
  /** Indicates whether the current user has download permissions on this object. */
  canDownload: boolean;
  /** Indicates whether the current user has modify permissions on this object. */
  canModify: boolean;
  /** Indicates whether the current user has read permissions on this object. */
  canRead: boolean;
  /** Indicates whether the current user has full control permissions on this object. */
  hasFullControl: boolean;
  _links: RecordPermissionsLinks;
}

export interface RecordPermissionsLinks {
  self: ApiLink;
}
