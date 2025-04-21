import { ApiLink } from "./ApiLink";
import { AuditEntry } from "./AuditEntry";

export interface AuditEntryCollection {
  entries: AuditEntry[];
  entryCount: number;
  objectId: string;
  _links: AuditEntryCollectionLinks;
}

export interface AuditEntryCollectionLinks {
  self: ApiLink;
}
