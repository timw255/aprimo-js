import { PmPagedLinks } from "./PmPagedCollection";

/**
 * Reference to a single system-type — a name plus the URI you'd use to
 * fetch its items.
 */
export interface SystemTypeRef {
  /** System-type name (e.g., `"activityType"`). */
  systemTypeName: string;
  /** Relative URI for fetching the items. */
  uri: string;
}

/**
 * Wrapper entry under `SystemTypeCollection.systemtypes` — pairs each
 * system-type reference under a `type` key the API uses for forward-compat.
 */
export interface SystemTypeRefEntry {
  /** The system-type reference. */
  type: SystemTypeRef;
}

/**
 * Catalog of every system-type configured on the tenant, as returned by
 * `systemTypes.get`. Drill into a specific list with `getByName` or
 * `getActiveByName`.
 */
export interface SystemTypeCollection {
  /** All system-type entries available on this tenant. */
  systemtypes: SystemTypeRefEntry[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
