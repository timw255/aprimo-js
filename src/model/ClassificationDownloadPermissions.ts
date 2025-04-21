import { ApiLink } from "./ApiLink";
import { ClassificationUserGroupDownloadPermission } from "./ClassificationUserGroupDownloadPermission";

export interface ClassificationDownloadPermissions {
  breakInheritance: boolean;
  permissions: ClassificationUserGroupDownloadPermission[];
  _links: ClassificationDownloadPermissionsLinks;
}

export interface ClassificationDownloadPermissionsLinks {
  self: ApiLink;
}
