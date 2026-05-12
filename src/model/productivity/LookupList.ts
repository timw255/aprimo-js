import { PmPagedLinks } from "./PmPagedCollection";
import { LookupListItem } from "./LookupListItem";

/**
 * A tenant-configured lookup list and its items — the picker options
 * used throughout PM. Read-only via the SDK; the list itself is defined
 * in the PM admin UI.
 */
export interface LookupList {
  /** Human-readable description of what the list represents. */
  description: string;
  /** Item count after any server-side filtering. */
  count: number;
  /** The list items. */
  items: LookupListItem[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
