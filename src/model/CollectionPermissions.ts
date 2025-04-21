import { ApiLink } from "./ApiLink";
import { CollectionContentPermission } from "./CollectionContentPermission";
import { CollectionGroupPermission } from "./CollectionGroupPermission";
import { CollectionUserPermission } from "./CollectionUserPermission";

export interface CollectionPermissions {
  canModify: boolean;
  canRead: boolean;
  contentPermission: CollectionContentPermission;
  groupsPermissions: CollectionGroupPermission[];
  permissions: CollectionUserPermission[];
  publicPermission: string;
  _links: CollectionPermissionsLinks;
}

export interface CollectionPermissionsLinks {
  self: ApiLink;
}
