import { ApiLink } from "./ApiLink";
import { ClassificationUserGroupRecordPermission } from "./ClassificationUserGroupPermission";

/**
 * Representation of a set of record permissions linked to a classification.
 *
 * Returned by `classifications.getRecordPermissions`.
 */
export interface ClassificationRecordPermissions {
  /** Indicates whether the record security inheritance chain is broken for the specified classification. */
  breakInheritance: boolean;
  /** The list of assigned record permissions per user group for the specified classification. */
  permissions: ClassificationUserGroupRecordPermission[];
  /** HAL-style hypermedia links for this resource. */
  _links: ClassificationRecordPermissionsLinks;
}

/** HAL-style link relations exposed on ClassificationRecordPermissions. */
export interface ClassificationRecordPermissionsLinks {
  /** Self link to this resource. */
  self: ApiLink;
}
