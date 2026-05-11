/**
 * Language-specific values for a RecordListField.
 *
 * Note: spec defines parallel TitleCase (`RecordListFieldValues`) and lowercase
 * (`Recordlistfieldvalues`) variants; the wrapper field schema $refs the
 * lowercase variant, which adds `aiInfluenced`.
 */
export interface RecordListFieldValues {
  /** Indicates if the value was influenced by AI. */
  aiInfluenced: boolean;
  /** The language identifier. */
  languageId: string;
  /** When the value was last modified. */
  modifiedOn: string;
  /** Whether the value is read-only. */
  readOnly: boolean;
  /** The record IDs. */
  values: string[];
}
