import { ApiLink } from "./ApiLink";

/**
 * Provides data about this service. Exposes the Content Security Policy
 * configuration (allowed domains).
 */
export interface Csp {
  /** Collection of allowed domains for Content Security Policy. */
  domains: string[];
  _links: CspLinks;
}

export interface CspLinks {
  self: ApiLink;
}
