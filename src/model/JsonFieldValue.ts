/**
 * Language-specific values for a JsonField. Must contain valid JSON content.
 */
export interface JsonFieldValue {
  /** Indicates if the value was influenced by AI. */
  aiInfluenced: boolean;
  /** The language identifier. */
  languageId: string;
  /** When the value was last modified. Format: date-time. */
  modifiedOn: string;
  /** Whether the value is read-only. */
  readOnly: boolean;
  /** The JSON content as a string. */
  value: string;
}
