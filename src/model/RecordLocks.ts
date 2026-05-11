import { ApiLink } from "./ApiLink";
import { RecordLock } from "./RecordLock";

/**
 * Representation of the locks on a Record.
 */
export interface RecordLocks {
  /** Collection of active locks on a record. */
  items: RecordLock[];
  _links: RecordLocksLinks;
}

export interface RecordLocksLinks {
  self: ApiLink;
}
