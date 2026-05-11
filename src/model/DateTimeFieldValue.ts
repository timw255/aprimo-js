/**
 * Language-specific values for a DateTimeField. Uses ISO 8601 format.
 */
export interface DateTimeFieldValue {
  /** Indicates if the value was influenced by AI. */
  aiInfluenced: boolean;
  /** The language identifier. */
  languageId: string;
  /** When the value was last modified. Format: date-time. */
  modifiedOn: string;
  /** Whether the value is read-only. */
  readOnly: boolean;
  /** The datetime value in ISO 8601 format. Format: date-time. */
  value: string;
}
