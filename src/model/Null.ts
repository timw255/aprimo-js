import { ApiLink } from "./ApiLink";

/**
 * Empty resource carrying only HAL `_links` (used for endpoints that return no body content
 * but still expose hypermedia links).
 */
export interface Null {
  _links: NullLinks;
}

/**
 * HAL `_links` for {@link Null}.
 */
export interface NullLinks {
  self: ApiLink;
}
