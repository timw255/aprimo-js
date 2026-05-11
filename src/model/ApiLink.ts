/**
 * A HAL-style hypermedia link used throughout the API for navigating between
 * related resources. Each link points to another resource via `href` and may
 * be used with the `select-key` header to embed the linked resource inline.
 *
 * The optional generic parameter `T` is used by the SDK to associate a link
 * with the type of resource it points to, enabling typed `_embedded` lookups.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ApiLink<T = unknown> {
  /** The target URL of the linked resource. */
  href: string;
  /** Identifier used with the `select-*` request headers to embed this resource. */
  "select-key": string;
}
