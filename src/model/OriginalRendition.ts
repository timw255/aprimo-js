import { ApiLink } from "./ApiLink";
import { PublicLinkCollection } from "./PublicLinkCollection";
import { RenditionType } from "./Rendition";

/**
 * Representation of an original rendition.
 */
export interface OriginalRendition {
  /**
   * The extension of the rendition.
   */
  extension: string;
  /**
   * Gets the identifier for the rendition. AprimoId.
   */
  id: string;
  /**
   * Gets the rendition name.
   */
  name: string;
  /**
   * The preview of the rendition. This property will not be returned by default. In order to include the
   * property in the response, add a header with the name 'select-rendition' and the value 'Preview' to your request.
   */
  preview: string;
  /**
   * Shortcut property to the URI of the published public link of the rendition. This property will not be
   * returned by default. In order to include the property in the response, add a header with the name
   * 'select-rendition' and the value 'PublishedUri' to your request.
   */
  publishedUri: string;
  /**
   * Gets the rendition type.
   */
  type: RenditionType;
  /**
   * Gets the uri for this rendition. This property will not be returned by default. In order to include the
   * property in the response, add a header with the name 'select-rendition' and the value 'Uri' to your request.
   */
  uri: string;
  /**
   * HAL `_links` for this rendition.
   */
  _links: OriginalRenditionLinks;
  /**
   * HAL `_embedded` resources keyed by link rel.
   */
  _embedded?: {
    [K in Exclude<
      keyof OriginalRenditionLinks,
      "self"
    >]?: OriginalRenditionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL link relations for an {@link OriginalRendition}.
 */
export interface OriginalRenditionLinks {
  /** Self link. */
  self: ApiLink;
  /** Collection of public links to this rendition. */
  publiclinks: ApiLink<PublicLinkCollection>;
}
