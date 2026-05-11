/**
 * Language-specific values for a TimeField. Format is HH:mm:ss.fffffff (e.g.
 * "14:30:00.0000000").
 */
export interface TimeFieldValue {
  /** Indicates if the value was influenced by AI. */
  aiInfluenced: boolean;
  /** The language identifier. */
  languageId: string;
  /** When the value was last modified. Format: date-time. */
  modifiedOn: string;
  /** Whether the value is read-only. */
  readOnly: boolean;
  /** The time value in HH:mm:ss.fffffff format. */
  value: string;
}
