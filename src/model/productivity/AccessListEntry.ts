/**
 * A single entry on an object's access list. Pairs a user with the parent
 * object and an edit-right flag — used on proposals, projects, and other
 * containers that carry their own access lists.
 */
export interface AccessListEntry {
  /** Parent object id the access entry applies to. */
  objectId: number;
  /** PM user id of the granted user. */
  userId: number;
  /** Whether the user has edit rights on the parent. */
  hasEditRight: number;
}
