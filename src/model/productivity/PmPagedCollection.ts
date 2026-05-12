/** HAL-style link on PM responses. */
export interface PmLink {
  /** Relative or absolute URL. */
  href: string;
}

/** Paging link relations returned on `PmPagedCollection._links`. */
export interface PmPagedLinks {
  /** Current request's canonical URL. */
  self?: PmLink;
  /** First page in the result set. */
  first?: PmLink;
  /** Last page in the result set. */
  last?: PmLink;
  /** Next page, if more results exist. */
  next?: PmLink;
  /** Previous page, if not on the first page. */
  prev?: PmLink;
}

/**
 * Paged-collection envelope returned by PM list endpoints. Items are
 * keyed under `_embedded` by an endpoint-specific name (`"Activity"`,
 * `"Project"`, etc.) — the SDK threads that literal key through the
 * `EmbeddedKey` generic.
 *
 * @typeParam T - The element type contained in the collection.
 * @typeParam EmbeddedKey - The literal `_embedded` key the endpoint uses.
 *
 * @example
 * ```ts
 * const res = await aprimo.productivity.activities.get();
 * if (res.ok) {
 *   const activities = res.data?._embedded?.Activity ?? [];
 *   console.log(`${res.data?._total} activities, ${activities.length} on this page`);
 * }
 * ```
 */
export interface PmPagedCollection<T, EmbeddedKey extends string = string> {
  /** Total count across all pages. */
  _total: number;
  /** Items for this page, keyed by the endpoint's resource name. */
  _embedded?: { [K in EmbeddedKey]?: T[] };
  /** HAL paging links. */
  _links?: PmPagedLinks;
}
