import { AdditionalFilePreviewCollection } from "./AdditionalFilePreviewCollection";
import { AdditionalFileType } from "./AdditionalFile";
import { ApiLink } from "./ApiLink";
import { Image } from "./Image";
import { PublicLink } from "./PublicLink";

/**
 * Color space of an image rendition or crop.
 */
export type ColorSpace =
  | "Unknown"
  | "Rgb"
  | "Cmyk"
  | "Lab"
  | "IndexedColor"
  | "Grayscale"
  | "Bitmap"
  | "KeepOriginal";

/**
 * Representation of a Crop.
 */
export interface Crop {
  /**
   * The color space of the crop.
   */
  colorSpace: ColorSpace;
  /**
   * Gets the CRC32 checksum of this additional file. Format: int32.
   */
  crc32: number;
  /**
   * Gets the file extension of the additional file.
   */
  extension: string;
  /**
   * Gets the file name of the additional file.
   */
  fileName: string;
  /**
   * Gets the file size of the additional file. Format: int64.
   */
  fileSize: number;
  /**
   * The height of the crop. Format: int32.
   */
  height: number;
  /**
   * Gets the identifier for this additional file. AprimoId.
   */
  id: string;
  /**
   * Returns true if this additional has been added manually. false is returned if the additional file was
   * created automatically.
   */
  isManual: boolean;
  /**
   * Is this a preset crop?
   */
  isPreset: boolean;
  /**
   * Is this a smart crop?
   */
  isSmart: boolean;
  /**
   * Gets the label of the additional file.
   */
  label: string;
  /**
   * Dictionary of metadata key-value pairs. Requires `select-crop: Metadata` header to be returned.
   */
  metadata: { [key: string]: string };
  /**
   * The preset hash of the crop.
   */
  presetHash: string;
  /**
   * The preset name of the crop.
   */
  presetName: string;
  /**
   * The preview of the crop. This property will not be returned by default. In order to include the property in
   * the response, add a header with the name 'select-additionalfile' and the value 'Preview' to your request.
   */
  preview: string;
  /**
   * List of purposes for this additional file. Filter with `select-filter-purposes` header.
   */
  purposes: string[];
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
   * Gets the tag of the additional file. This property will not be returned by default. In order to include the
   * property in the response, add a header with the name 'select-crop' and the value 'Tag' to your request.
   */
  tag: string;
  /**
   * Gets the type of this additional file. Can be filtered by adding a header with the name
   * 'select-additionalfile-type' and the (comma separated) string as the value.
   */
  type: AdditionalFileType;
  /**
   * Returns a path to image or if no image is assigned. This URL remains valid for four hours. This property
   * will not be returned by default. In order to include the property in the response, add a header with the
   * name 'select-additionalfile' and the value 'Uri' to your request.
   */
  uri: string;
  /**
   * List of usages for this additional file. Filter with `select-additionalfile-usage` header.
   */
  usages: string[];
  /**
   * The X coordinate of the crop. Format: int32.
   */
  x: number;
  /**
   * The Y coordinate of the crop. Format: int32.
   */
  y: number;
  /**
   * The width of the crop. Format: int32.
   */
  width: number;
  /**
   * HAL `_links` for this crop.
   */
  _links: CropLinks;
  /**
   * HAL `_embedded` resources keyed by link rel.
   */
  _embedded?: {
    [K in Exclude<keyof CropLinks, "self">]?: CropLinks[K] extends ApiLink<
      infer R
    >
      ? R
      : never;
  };
}

/**
 * HAL link relations for a {@link Crop}.
 */
export interface CropLinks {
  /** Self link. */
  self: ApiLink;
  /** Public link to this crop. */
  publiclink: ApiLink<PublicLink>;
  /** Main preview image. */
  mainpreview: ApiLink<Image>;
  /** Collection of file previews. */
  filepreviews: ApiLink<AdditionalFilePreviewCollection>;
}
