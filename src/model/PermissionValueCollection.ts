import { ApiLink } from "./ApiLink";
import { PermissionValue } from "./PermissionValue";

export interface PermissionValueCollection {
  items: PermissionValue[];
  _links: PermissionValueCollectionLinks;
}

export interface PermissionValueCollectionLinks {
  self: ApiLink;
}
