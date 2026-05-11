/**
 * Language-specific values for an OptionListField.
 *
 * Note: spec defines parallel TitleCase (`OptionListFieldValues`) and lowercase
 * (`Optionlistfieldvalues`) variants; the wrapper field schema $refs the lowercase
 * variant, so descriptions/mismatches are tracked against that one.
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
