import { ApiLink } from "./ApiLink";

export interface AuditEntryId {
  changeCount: number;
  changes: object[];
  createdOn: string;
  id: number;
  objectId: string;
  userId: string;
  _links: AuditEntryIdLinks;
}

export interface AuditEntryIdLinks {
  self: ApiLink;
}
