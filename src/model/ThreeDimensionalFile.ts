import { AdditionalFilePreviewCollection } from "./AdditionalFilePreviewCollection";
import { AdditionalFileType } from "./AdditionalFile";
import { ApiLink } from "./ApiLink";
import { Image } from "./Image";
import { PublicLink } from "./PublicLink";

/**
 * Representation of a 3D additional file.
 */
export interface ThreeDimensionalFile {
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
   * Gets the identifier for this additional file. AprimoId.
   */
  id: string;
  /**
   * Returns true if this additional has been added manually. false is returned if the additional file was
   * created automatically.
   */
  isManual: boolean;
  /**
   * Gets the label of the additional file.
   */
  label: string;
  /**
   * Dictionary of metadata key-value pairs. Requires `select-threedimensionalfile: Metadata` header to be returned.
   */
  metadata: { [key: string]: string };
  /**
   * List of purposes for this additional file. Filter with `select-filter-purposes` header.
   */
  purposes: string[];
  /**
   * Gets the tag of the additional file. This property will not be returned by default. In order to include the
   * property in the response, add a header with the name 'select-threedimensionalfile' and the value 'Tag' to
   * your request.
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
   * HAL `_links` for this 3D file.
   */
  _links: ThreeDimensionalFileLinks;
  /**
   * HAL `_embedded` resources keyed by link rel.
   */
  _embedded?: {
    [K in Exclude<
      keyof ThreeDimensionalFileLinks,
      "self"
    >]?: ThreeDimensionalFileLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL link relations for a {@link ThreeDimensionalFile}.
 */
export interface ThreeDimensionalFileLinks {
  /** Self link. */
  self: ApiLink;
  /** Public link to this 3D file. */
  publiclink: ApiLink<PublicLink>;
  /** Main preview image. */
  mainpreview: ApiLink<Image>;
  /** Collection of file previews. */
  filepreviews: ApiLink<AdditionalFilePreviewCollection>;
}
