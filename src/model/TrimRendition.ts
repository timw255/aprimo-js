import { ApiLink } from "./ApiLink";
import { PublicLinkCollection } from "./PublicLinkCollection";
import { RenditionType } from "./Rendition";

/**
 * Representation of a rendition (trim rendition).
 */
export interface TrimRendition {
  /** Duration of the trim. */
  duration: string;
  /** Extension of the rendition. */
  extension: string;
  /** Identifier (AprimoId) for the rendition. */
  id: string;
  /** Rendition name. */
  name: string;
  /** Preview of the rendition. Not returned by default — request with `select-rendition: Preview`. */
  preview: string;
  /** Shortcut to the URI of the published public link. Not returned by default — request with `select-rendition: PublishedUri`. */
  publishedUri: string;
  /** Start time of the trim. */
  startTime: string;
  /**
   * Rendition type.
   */
  type: RenditionType;
  /** URI for this rendition. Not returned by default — request with `select-rendition: Uri`. */
  uri: string;
  _links: TrimRenditionLinks;
  _embedded?: {
    [K in Exclude<
      keyof TrimRenditionLinks,
      "self"
    >]?: TrimRenditionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL `_links` for {@link TrimRendition}.
 */
export interface TrimRenditionLinks {
  self: ApiLink;
  publiclinks: ApiLink<PublicLinkCollection>;
}
