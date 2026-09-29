import { ApiLink } from "./ApiLink";
import { ClassificationUserGroupPermission } from "./ClassificationUserGroupPermission";

/**
 * Representation of a set of subtree permissions linked to a classification.
 *
 * Returned by `classifications.getTreePermissions`. For permissions on a
 * classification's records, see {@link ClassificationRecordPermissions}.
 */
export interface ClassificationPermissions {
  /** Indicates whether the security inheritance chain is broken for the specified classification. */
  breakInheritance: boolean;
  /** The list of assigned permissions per user group for the specified classification. */
  permissions: ClassificationUserGroupPermission[];
  /** HAL-style hypermedia links for this resource. */
  _links: ClassificationPermissionsLinks;
}

/** HAL-style link relations exposed on ClassificationPermissions. */
export interface ClassificationPermissionsLinks {
  /** Self link to this resource. */
  self: ApiLink;
}
