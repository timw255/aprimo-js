import { ApiLink } from "./ApiLink";
import { CalculatedPermission } from "./CalculatedPermission";

export interface CalculatedPermissionCollection {
  items: CalculatedPermission[];
  _links: CalculatedPermissionCollectionLinks;
}

export interface CalculatedPermissionCollectionLinks {
  self: ApiLink;
}
