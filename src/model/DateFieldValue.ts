/**
 * Language-specific values for a DateField. Format is yyyy-MM-dd.
 */
export interface DateFieldValue {
  /** Indicates if the value was influenced by AI. */
  aiInfluenced: boolean;
  /**
   * Whether the day component is specified.
   */
  hasDay: boolean;
  /**
   * Whether the month component is specified.
   */
  hasMonth: boolean;
  /** The language identifier. */
  languageId: string;
  /** When the value was last modified. Format: date-time. */
  modifiedOn: string;
  /** Whether the value is read-only. */
  readOnly: boolean;
  /** The date value in yyyy-MM-dd format. Format: date. */
  value: string;
}
