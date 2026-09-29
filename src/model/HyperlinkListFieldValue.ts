import { Hyperlink } from "./Hyperlink";

/**
 * Language-specific values for a HyperlinkListField.
 */
export interface HyperlinkListFieldValues {
  /** Indicates if the value was influenced by AI. */
  aiInfluenced: boolean;
  /** Array of hyperlinks. */
  hyperlinks: Hyperlink[];
  /** The language identifier. */
  languageId: string;
  /** When the value was last modified. */
  modifiedOn: string;
  /** Whether the value is read-only. */
  readOnly: boolean;
  /** Generic hyperlink values (alternate flat shape). */
  values: object[] | null;
}
