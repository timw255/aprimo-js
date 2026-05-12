import { PmPagedLinks } from "./PmPagedCollection";

/**
 * A localized resource entry from the PM resource catalog — typically a
 * label or control string keyed by a dotted-namespace id.
 */
export interface Resource {
  /** Dotted-namespace resource id (e.g., `"activities.name"`). */
  id: string;
  /** Localized value for the current user's locale. */
  value: string;
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
