/**
 * Language-specific values for a UserListField.
 *
 * Note: spec defines parallel TitleCase (`UserListFieldValues`) and lowercase
 * (`Userlistfieldvalues`) variants; the wrapper field schema $refs the
 * lowercase variant, which adds `aiInfluenced`.
 */
export interface UserListFieldValues {
  /** Indicates if the value was influenced by AI. */
  aiInfluenced: boolean;
  /** The language identifier. */
  languageId: string;
  /** When the value was last modified. */
  modifiedOn: string;
  /** Whether the value is read-only. */
  readOnly: boolean;
  /** The user IDs. */
  values: string[];
}
