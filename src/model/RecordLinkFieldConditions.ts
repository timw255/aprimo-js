/**
 * Represents conditions for a record link field.
 */
export interface RecordLinkFieldConditions {
  /** Specifies whether the record meets the requirements for being a child record for this field. */
  canBeChild: boolean;
  /** Specifies whether the record meets the requirements for being a linked record for this field. */
  canBeLink: boolean;
  /** Specifies whether the record meets the requirements for being a parent record for this field. */
  canBeParent: boolean;
}
