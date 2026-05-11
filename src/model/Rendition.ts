import { ApiLink } from "./ApiLink";
import { PublicLinkCollection } from "./PublicLinkCollection";

/**
 * Rendition type discriminator.
 */
export type RenditionType =
  | "Original"
  | "Preset"
  | "Crop"
  | "Trim"
  | "Custom";

/**
 * Representation of a rendition.
 */
export interface Rendition {
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
   * Width of the rendition in pixels.
   */
  width: number,
  /**
   * Height of the rendition in pixels.
   */
  height: number,
  /**
   * Resize width of the rendition in pixels.
   */
  resizeWidth: number,
  /**
   * Resize height of the rendition in pixels.
   */
  resizeHeight: number,
  /**
   * HAL `_links` for this rendition.
   */
  _links: RenditionLinks;
  /**
   * HAL `_embedded` resources keyed by link rel.
   */
  _embedded?: {
    [K in Exclude<
      keyof RenditionLinks,
      "self"
    >]?: RenditionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL link relations for a {@link Rendition}.
 */
export interface RenditionLinks {
  /** Self link. */
  self: ApiLink;
  /** Collection of public links to this rendition. */
  publiclinks: ApiLink<PublicLinkCollection>;
}
