import { AdditionalFilePreviewCollection } from "./AdditionalFilePreviewCollection";
import { AdditionalFileType } from "./AdditionalFile";
import { ApiLink } from "./ApiLink";
import { Image } from "./Image";
import { PublicLink } from "./PublicLink";

/**
 * Representation of a Spinset additional file.
 */
export interface Spinset {
  /** CRC32 checksum of this additional file. Format: int32. */
  crc32: number;
  /** File extension of the additional file. */
  extension: string;
  /** File name of the additional file. */
  fileName: string;
  /** File size of the additional file in bytes. Format: int64. */
  fileSize: number;
  /** Identifier (AprimoId) for this additional file. */
  id: string;
  /** True when added manually; false when created automatically. */
  isManual: boolean;
  /** Label of the additional file. */
  label: string;
  /** Dictionary of metadata key-value pairs. Requires `select-spinset: Metadata` header to be returned. */
  metadata: { [key: string]: string };
  /** List of purposes for this additional file. Filter with `select-filter-purposes` header. */
  purposes: string[];
  /** Custom XML tag of the additional file. Not returned by default — request with `select-spinset: Tag`. */
  tag: string;
  /**
   * Type of this additional file. Can be filtered via `select-additionalfile-type` header.
   */
  type: AdditionalFileType;
  /** Path to the file content. URL is valid for four hours. Not returned by default — request with `select-additionalfile: Uri`. */
  uri: string;
  /** List of usages for this additional file. Filter with `select-additionalfile-usage` header. */
  usages: string[];
  _links: SpinsetLinks;
  _embedded?: {
    [K in Exclude<
      keyof SpinsetLinks,
      "self"
    >]?: SpinsetLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL `_links` for {@link Spinset}.
 */
export interface SpinsetLinks {
  self: ApiLink;
  publiclink: ApiLink<PublicLink>;
  mainpreview: ApiLink<Image>;
  filepreviews: ApiLink<AdditionalFilePreviewCollection>;
}
