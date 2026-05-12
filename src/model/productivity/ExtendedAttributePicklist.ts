import { PmPagedLinks } from "./PmPagedCollection";

/**
 * One option in an extended-attribute picklist. Omit `itemId` to create
 * a new option; include it to update an existing one.
 */
export interface ExtendedAttributePicklistItem {
  /** Stable numeric identifier (server-assigned). */
  itemId?: number;
  /** Human-readable label shown in pickers. */
  displayValue: string;
  /** Ordering position. */
  sequence?: number;
  /** Whether the item is selectable. */
  active?: boolean;
  /** Internal system-name for API/integration use. */
  systemName?: string;
}

/**
 * The full picklist for an extended attribute — items plus describing
 * metadata. Returned by both `getPicklistOptions` and `getAllowedChildren`.
 */
export interface ExtendedAttributePicklist {
  /** Picklist display name. */
  listName?: string;
  /** Long-form description. */
  description?: string;
  /** Options in the picklist. */
  items: ExtendedAttributePicklistItem[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
