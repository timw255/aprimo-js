/**
 * Language-specific values for a NumericField. Values are stored as decimals using
 * InvariantCulture format (period as decimal separator).
 */
export interface NumericFieldValue {
  /** Indicates if the value was influenced by AI. */
  aiInfluenced: boolean;
  /** The language identifier. */
  languageId: string;
  /** When the value was last modified. Format: date-time. */
  modifiedOn: string;
  /** Whether the value is read-only. */
  readOnly: boolean;
  /** The numeric value (string-serialized using InvariantCulture). */
  value: string;
}
