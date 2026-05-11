import { ApiLink } from "./ApiLink";
import { PublicLinkCollection } from "./PublicLinkCollection";
import { RenditionType } from "./Rendition";

/**
 * Representation of a preset rendition.
 */
export interface PresetRendition {
  /**
   * The calculated crc32 of the preset rendition. Format: int32.
   */
  crc32: number;
  /**
   * The extension of the rendition.
   */
  extension: string;
  /**
   * The height of the preset rendition. Format: int32.
   */
  height: number;
  /**
   * Gets the identifier for the rendition. AprimoId.
   */
  id: string;
  /**
   * Gets the rendition name.
   */
  name: string;
  /**
   * The hash of the preset rendition.
   */
  presetHash: string;
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
   * The width of the preset rendition. Format: int32.
   */
  width: number;
  /**
   * HAL `_links` for this rendition.
   */
  _links: PresetRenditionLinks;
  /**
   * HAL `_embedded` resources keyed by link rel.
   */
  _embedded?: {
    [K in Exclude<
      keyof PresetRenditionLinks,
      "self"
    >]?: PresetRenditionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL link relations for a {@link PresetRendition}.
 */
export interface PresetRenditionLinks {
  /** Self link. */
  self: ApiLink;
  /** Collection of public links to this rendition. */
  publiclinks: ApiLink<PublicLinkCollection>;
}
