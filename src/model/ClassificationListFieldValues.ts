/**
 * Language-specific values for a ClassificationListField.
 */
export interface ClassificationListFieldValues {
  /** Indicates if the value was influenced by AI. */
  aiInfluenced: boolean;
  /** The language identifier. */
  languageId: string;
  /** When the value was last modified. Format: date-time. */
  modifiedOn: string;
  /** Whether the value is read-only. */
  readOnly: boolean;
  /** The classification IDs (AprimoId values). */
  values: string[];
}
