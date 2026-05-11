import { RecordLinkItem } from "./RecordLinkItem";

/**
 * Language-specific values for a RecordLinkField. Supports parent/child/link
 * relationships between records (unlike RecordListFieldValues, this type
 * maintains directional relationships).
 *
 * Note: spec has parallel TitleCase (`RecordLinkFieldValues`) and lowercase
 * (`Recordlinkfieldvalues`) variants. The TitleCase variant defines the
 * `parents` / `children` / `links` arrays of `RecordLinkItem` (matching the SDK).
 * The lowercase variant — which the wrapper field schema actually $refs —
 * defines `aiInfluenced` plus a flat `values: AprimoId[]` array. Mismatches
 * below are flagged against the lowercase variant.
 */
export interface RecordLinkFieldValues {
  /** Indicates if the value was influenced by AI. */
  aiInfluenced: boolean;
  /** Records that are children of this record. */
  children: RecordLinkItem[];
  /** The language ID for this value. */
  languageId: string;
  /** Records linked to this record (non-directional). */
  links: RecordLinkItem[];
  /** When this field value was last modified. */
  modifiedOn: string;
  /** Records that are parents of this record. */
  parents: RecordLinkItem[];
  /** Whether this field value is read-only. */
  readOnly: boolean;
  /** Flat array of record link IDs (alternate flat spec shape). */
  values: string[] | null;
}
