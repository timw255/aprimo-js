import { ApiLink } from "./ApiLink";

export interface PermissionValue {
  name: string;
  value: string;
  _links: PermissionValueLinks;
}

export interface PermissionValueLinks {
  self: ApiLink;
}
