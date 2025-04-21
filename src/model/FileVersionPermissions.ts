import { ApiLink } from "./ApiLink";

export interface FileVersionPermissions {
  canDownload: boolean;
  _links: FileVersionPermissionsLinks;
}

export interface FileVersionPermissionsLinks {
  self: ApiLink;
}
