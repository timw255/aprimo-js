import { ApiLink } from "./ApiLink";

export interface CalculatedPermission {
  name: string;
  value: string;
  _links: CalculatedPermissionLinks;
}

export interface CalculatedPermissionLinks {
  self: ApiLink;
}
