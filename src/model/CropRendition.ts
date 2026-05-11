import { ApiLink } from "./ApiLink";
import { ColorSpace } from "./Crop";
import { PublicLinkCollection } from "./PublicLinkCollection";
import { RenditionType } from "./Rendition";

/**
 * Representation of a crop rendition.
 */
export interface CropRendition {
  /**
   * The color space of the crop.
   */
  colorSpace: ColorSpace;
  /**
   * The extension of the rendition.
   */
  extension: string;
  /**
   * The height of the crop. Format: int32.
   */
  height: number;
  /**
   * Gets the identifier for the rendition. AprimoId.
   */
  id: string;
  /**
   * Whether or not this is a preset crop.
   */
  isPreset: boolean;
  /**
   * Whether or not this is a smart crop.
   */
  isSmart: boolean;
  /**
   * Gets the rendition name.
   */
  name: string;
  /**
   * The preset hash of the crop.
   */
  presetHash: string;
  /**
   * The preset name of the crop.
   */
  presetName: string;
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
   * The resize format of the crop.
   */
  resizeFormat: string;
  /**
   * The resize height of the crop. Format: int32.
   */
  resizeHeight: number;
  /**
   * The resize width of the crop. Format: int32.
   */
  resizeWidth: number;
  /**
   * The resolution of the crop. Format: int32.
   */
  resolution: number;
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
   * The width of the crop. Format: int32.
   */
  width: number;
  /**
   * The x coordinate of the position of the crop. Format: int32.
   */
  x: number;
  /**
   * The y coordinate of the position of the crop. Format: int32.
   */
  y: number;
  /**
   * HAL `_links` for this rendition.
   */
  _links: CropRenditionLinks;
  /**
   * HAL `_embedded` resources keyed by link rel.
   */
  _embedded?: {
    [K in Exclude<
      keyof CropRenditionLinks,
      "self"
    >]?: CropRenditionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL link relations for a {@link CropRendition}.
 */
export interface CropRenditionLinks {
  /** Self link. */
  self: ApiLink;
  /** Collection of public links to this rendition. */
  publiclinks: ApiLink<PublicLinkCollection>;
}
