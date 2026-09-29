/**
 * Language-specific values for a UserGroupListField.
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
