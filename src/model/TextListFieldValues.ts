/**
 * Language-specific values for a TextListField. Contains an array of text values.
 */
export interface TextListFieldValues {
  /** Flag to indicate whether the value has come from AI. */
  aiInfluenced: boolean;
  /** The language identifier. */
  languageId: string;
  /** When the value was last modified. Format: date-time. */
  modifiedOn: string;
  /** Whether the value is read-only. */
  readOnly: boolean;
  /** Language-specific collection of texts. */
  values: string[];
}
