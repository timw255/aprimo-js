import { ApiLink } from "./ApiLink";

/**
 * Audit Resource — a single audit entry identified by its sequential id. Captures the changes,
 * the user, and the timestamp for one auditable change to an object.
 */
export interface AuditEntryId {
  /** Provides Total number of Changes. Format: int32. */
  changeCount: number;
  /** Array of changes made in this audit entry. */
  changes: object[];
  /** Get Created Date. Format: date-time. */
  createdOn: string;
  /** Gets an external identifier of a user, in case it isn't a DAM user. */
  externalUserName: string | null;
  /** Get Entry Id of an Audit. Format: int64. */
  id: number;
  /** Get Object Id of Audit. */
  objectId: string;
  /** Get User Id. */
  userId: string;
  _links: AuditEntryIdLinks;
}

export interface AuditEntryIdLinks {
  self: ApiLink;
}
