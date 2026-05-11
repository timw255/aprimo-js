import { ApiLink } from "./ApiLink";
import { AuditEntry } from "./AuditEntry";

/**
 * Audit Resource — collection of audit entries for a single audited object.
 */
export interface AuditEntryCollection {
  /** List of audit entry records for this object. */
  entries: AuditEntry[];
  /** Gets or sets the total entry count. Format: int32. */
  entryCount: number;
  /** Gets or sets the audit object id. */
  objectId: string;
  _links: AuditEntryCollectionLinks;
}

export interface AuditEntryCollectionLinks {
  self: ApiLink;
}
