import { ApiLink } from "./ApiLink";

/**
 * Representation of the permissions of the current user on a Classification.
 */
export interface ClassificationUserPermissions {
  /** Indicates whether the current user has classify permissions on this object. */
  canClassify: boolean;
  /** Indicates whether the current user has delete permissions on this object. */
  canDelete: boolean;
  /** Indicates whether the current user has modify permissions on this object. */
  canModify: boolean;
  /** Indicates whether the current user has read permissions on this object. */
  canRead: boolean;
  /** HAL-style hypermedia links for this resource. */
  _links: ClassificationUserPermissionsLinks;
}

/** HAL-style link relations exposed on ClassificationUserPermissions. */
export interface ClassificationUserPermissionsLinks {
  /** Self link to this resource. */
  self: ApiLink;
}
