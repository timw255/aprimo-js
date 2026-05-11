/**
 * Representation of the lock on a record.
 */
export interface RecordLock {
  /** Gets the IntegrationId of this lock. */
  integrationId: string;
  /** Gets the LockedOn of this lock. Format: date-time. */
  lockedOn: string;
  /** Gets the LockId of this lock. */
  lockId: string;
  /** Gets the Reason of this lock. */
  reason: string;
  /** Gets the Uri of this lock. */
  uri: string;
}
