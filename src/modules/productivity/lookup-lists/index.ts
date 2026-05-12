import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { LookupList } from "../../../model/productivity/LookupList";
import { buildQueryString } from "../../../utils";

/** Query params accepted by `lookupLists.getById`. */
export interface LookupQueryParams {
  /** Substring filter on item display values. */
  filterText?: string;
  /** Sub-list id (drives the second dimension of two-level pickers). */
  subListID?: number | string;
  /** Open-ended additional fields per tenant config. */
  [key: string]: unknown;
}

/**
 * Tenant-configured lookup lists — picker options used throughout PM
 * (e.g., region, status, custom enums). Lists are read-only here; the
 * list itself is defined in the PM admin UI.
 */
export const lookupLists = (client: HttpClient) => ({
  /**
   * Fetch a single lookup list with its items.
   *
   * @param id - Lookup-list id.
   * @param params - Optional filter / sub-list scoping.
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.lookupLists.getById(42);
   * if (res.ok) console.log(res.data?.items.map(i => i.value));
   * ```
   */
  getById: async (
    id: number | string,
    params?: LookupQueryParams,
  ): Promise<ApiResult<LookupList>> => {
    return client.get(`/api/lookup/${id}${buildQueryString(params)}`);
  },
});
