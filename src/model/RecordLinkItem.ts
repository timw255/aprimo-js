/**
 * A linked record in a record link field.
 */
export interface RecordLinkItem {
  /** When this link was last modified. */
  modifiedOn: string;
  /** The ID of the linked record. */
  recordId: string;
  /** Custom XML tag data for this link. */
  tag: string;
}
