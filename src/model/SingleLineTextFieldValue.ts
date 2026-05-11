/**
 * Language-specific values for a SingleLineTextField. Text cannot contain newline
 * characters; maximum length is typically 4000 characters.
 */
export interface SingleLineTextFieldValue {
  /** Indicates if the value was influenced by AI. */
  aiInfluenced: boolean;
  /** The language identifier. */
  languageId: string;
  /** When the value was last modified. Format: date-time. */
  modifiedOn: string;
  /** Whether the value is read-only. */
  readOnly: boolean;
  /** The text value (cannot contain newlines). */
  value: string;
}
