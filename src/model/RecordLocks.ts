import { ApiLink } from "./ApiLink";
import { RecordLock } from "./RecordLock";

export interface RecordLocks {
  items: RecordLock[];
  _links: RecordLocksLinks;
}

export interface RecordLocksLinks {
  self: ApiLink;
}
