import { ApiLink } from "./ApiLink";

export interface RecordPermissions {
  canDelete: boolean;
  canDownload: boolean;
  canModify: boolean;
  canRead: boolean;
  hasFullControl: boolean;
  _links: RecordPermissionsLinks;
}

export interface RecordPermissionsLinks {
  self: ApiLink;
}
