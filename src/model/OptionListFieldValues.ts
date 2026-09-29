/**
 * Language-specific values for an OptionListField.
 */
export interface OptionListFieldValues {
  /** Indicates if the value was influenced by AI. */
  aiInfluenced: boolean;
  /** The language identifier. */
  languageId: string;
  /** When the value was last modified. */
  modifiedOn: string;
  /** Whether the value is read-only. */
  readOnly: boolean;
  /** The option list item IDs. */
  values: string[];
}
