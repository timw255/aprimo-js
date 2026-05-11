import { AdditionalFilePreviewCollection } from "./AdditionalFilePreviewCollection";
import { AdditionalFileType } from "./AdditionalFile";
import { ApiLink } from "./ApiLink";
import { Image } from "./Image";
import { PublicLink } from "./PublicLink";

/**
 * Representation of a Trim additional file.
 */
export interface Trim {
  /** CRC32 checksum of this additional file. Format: int32. */
  crc32: number;
  /** Duration of the trim. */
  duration: string;
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
  /** Dictionary of metadata key-value pairs. Requires `select-trim: Metadata` header to be returned. */
  metadata: { [key: string]: string };
  /** Preview of the trim. Not returned by default — request with `select-additionalfile: Preview`. */
  preview: string;
  /** List of purposes for this additional file. Filter with `select-filter-purposes` header. */
  purposes: string[];
  /** Start time of the trim. */
  startTime: string;
  /** Custom XML tag of the additional file. Not returned by default — request with `select-trim: Tag`. */
  tag: string;
  /**
   * Type of this additional file. Can be filtered via `select-additionalfile-type` header.
   */
  type: AdditionalFileType;
  /** Path to the file content. URL is valid for four hours. Not returned by default — request with `select-additionalfile: Uri`. */
  uri: string;
  /** List of usages for this additional file. Filter with `select-additionalfile-usage` header. */
  usages: string[];
  _links: TrimLinks;
  _embedded?: {
    [K in Exclude<keyof TrimLinks, "self">]?: TrimLinks[K] extends ApiLink<
      infer R
    >
      ? R
      : never;
  };
}

/**
 * HAL `_links` for {@link Trim}.
 */
export interface TrimLinks {
  self: ApiLink;
  publiclink: ApiLink<PublicLink>;
  mainpreview: ApiLink<Image>;
  filepreviews: ApiLink<AdditionalFilePreviewCollection>;
}
