export type AuditEntryType =
  | "recordCreated"
  | "recordModified"
  | "recordDownloaded";

export interface AuditEntry {
  id: number;
  type: AuditEntryType;
  userId: string;
  createdOn: string;
  changeCount: number;
}
