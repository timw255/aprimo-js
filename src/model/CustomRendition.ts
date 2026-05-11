import { ApiLink } from "./ApiLink";
import { PublicLinkCollection } from "./PublicLinkCollection";
import { RenditionType } from "./Rendition";

/**
 * Representation of a custom rendition.
 */
export interface CustomRendition {
  /**
   * The extension of the rendition.
   */
  extension: string;
  /**
   * Gets the identifier for the rendition. AprimoId.
   */
  id: string;
  /**
   * Dictionary of metadata key-value pairs. Requires `select-customrendition: Metadata` header to be returned.
   */
  metadata: { [key: string]: string };
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
  _links: CustomRenditionLinks;
  /**
   * HAL `_embedded` resources keyed by link rel.
   */
  _embedded?: {
    [K in Exclude<
      keyof CustomRenditionLinks,
      "self"
    >]?: CustomRenditionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL link relations for a {@link CustomRendition}.
 */
export interface CustomRenditionLinks {
  /** Self link. */
  self: ApiLink;
  /** Collection of public links to this rendition. */
  publiclinks: ApiLink<PublicLinkCollection>;
}
