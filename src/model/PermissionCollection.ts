import { ApiLink } from "./ApiLink";
import { Permission } from "./Permission";

export interface PermissionCollection {
  items: Permission[];
  _links: PermissionCollectionLinks;
}

export interface PermissionCollectionLinks {
  self: ApiLink;
}
