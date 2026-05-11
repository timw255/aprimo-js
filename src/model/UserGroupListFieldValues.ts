/**
 * Language-specific values for a UserGroupListField.
 *
 * Note: spec defines parallel TitleCase (`UserGroupListFieldValues`) and
 * lowercase (`Usergrouplistfieldvalues`) variants; the wrapper field schema
 * $refs the lowercase variant, which adds `aiInfluenced`.
 */
export interface UserGroupListFieldValues {
  /** Indicates if the value was influenced by AI. */
  aiInfluenced: boolean;
  /** The language identifier. */
  languageId: string;
  /** When the value was last modified. */
  modifiedOn: string;
  /** Whether the value is read-only. */
  readOnly: boolean;
  /** The user group IDs. */
  values: string[];
}
