import { Hyperlink } from "./Hyperlink";

/**
 * Language-specific values for a HyperlinkListField.
 *
 * Note: spec defines parallel TitleCase (`HyperlinkListFieldValues`) and
 * lowercase (`Hyperlinklistfieldvalues`) variants. The TitleCase variant
 * defines `hyperlinks: Hyperlink[]` (matching the SDK). The lowercase variant —
 * which the wrapper field schema actually $refs — defines `aiInfluenced` and
 * a generic `values: object[]` array instead. Mismatches are flagged against
 * the lowercase variant.
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
  /** Generic hyperlink values (alternate flat spec shape). */
  values: object[] | null;
}
