import { ApiLink } from "./ApiLink";
import { ClassificationUserGroupDownloadPermission } from "./ClassificationUserGroupDownloadPermission";

/**
 * Representation of a set of download permissions linked to a classification.
 */
export interface ClassificationDownloadPermissions {
  /** Indicates whether the record security inheritance chain is broken for the specified classification. */
  breakInheritance: boolean;
  /** The list of assigned download permissions per user group for the specified classification. */
  permissions: ClassificationUserGroupDownloadPermission[];
  /** HAL-style hypermedia links for this resource. */
  _links: ClassificationDownloadPermissionsLinks;
}

/** HAL-style link relations exposed on ClassificationDownloadPermissions. */
export interface ClassificationDownloadPermissionsLinks {
  /** Self link to this resource. */
  self: ApiLink;
}
