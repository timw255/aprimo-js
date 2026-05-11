/**
 * Language-specific values for a MultiLineTextField. Supports newlines and longer
 * content.
 */
export interface MultiLineTextFieldValue {
  /** Indicates if the value was influenced by AI. */
  aiInfluenced: boolean;
  /** The language identifier. */
  languageId: string;
  /** When the value was last modified. Format: date-time. */
  modifiedOn: string;
  /** Whether the value is read-only. */
  readOnly: boolean;
  /** The text value (supports newlines). */
  value: string;
}
