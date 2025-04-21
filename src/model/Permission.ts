import { ApiLink } from "./ApiLink";
import { Label } from "./Label";

export interface Permission {
  labels: Label[];
  name: string;
  _links: PermissionLinks;
}

export interface PermissionLinks {
  self: ApiLink;
}
