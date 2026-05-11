/**
 * Language-specific values for a LanguageListField.
 *
 * Note: spec defines parallel TitleCase (`LanguageListFieldValues`) and
 * lowercase (`Languagelistfieldvalues`) variants; the wrapper field schema
 * $refs the lowercase variant, which adds `aiInfluenced`.
 */
export interface LanguageListFieldValues {
  /** Indicates if the value was influenced by AI. */
  aiInfluenced: boolean;
  /** The language identifier. */
  languageId: string;
  /** When the value was last modified. */
  modifiedOn: string;
  /** Whether the value is read-only. */
  readOnly: boolean;
  /** The language IDs. */
  values: string[];
}
