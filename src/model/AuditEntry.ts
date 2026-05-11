/**
 * A single entry in a record's audit history.
 */
export type AuditEntryType =
  | "recordCreated"
  | "recordModified"
  | "recordDownloaded";

/**
 * A single entry in a record's audit history.
 */
export interface AuditEntry {
  id: number;
  type: AuditEntryType;
  userId: string;
  createdOn: string;
  changeCount: number;
}
