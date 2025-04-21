import { ApiLink } from "./ApiLink";
import { ClassificationUserGroupPermission } from "./ClassificationUserGroupPermission";

export interface ClassificationPermissions {
  breakInheritance: boolean;
  permissions: ClassificationUserGroupPermission[];
  _links: ClassificationPermissionsLinks;
}

export interface ClassificationPermissionsLinks {
  self: ApiLink;
}
