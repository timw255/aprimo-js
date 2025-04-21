import { ApiLink } from "./ApiLink";

export interface ClassificationUserPermissions {
  canClassify: boolean;
  canDelete: boolean;
  canModify: boolean;
  canRead: boolean;
  _links: ClassificationUserPermissionsLinks;
}

export interface ClassificationUserPermissionsLinks {
  self: ApiLink;
}
