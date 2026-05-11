/**
 * Language-specific values for an HtmlField. Must contain valid HTML content.
 */
export interface HtmlFieldValue {
  /** Indicates if the value was influenced by AI. */
  aiInfluenced: boolean;
  /** The language identifier. */
  languageId: string;
  /** When the value was last modified. Format: date-time. */
  modifiedOn: string;
  /** Whether the value is read-only. */
  readOnly: boolean;
  /** The HTML content. */
  value: string;
}
