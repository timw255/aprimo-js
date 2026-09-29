import { RecordLinkItem } from "./RecordLinkItem";

/**
 * Language-specific values for a RecordLinkField. Supports parent/child/link
 * relationships between records (unlike RecordListFieldValues, this type
 * maintains directional relationships).
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
  /** Flat array of record link IDs (alternate flat shape). */
  values: string[] | null;
}
