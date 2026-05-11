import { AdditionalFilePreviewCollection } from "./AdditionalFilePreviewCollection";
import { AdditionalFileType } from "./AdditionalFile";
import { ApiLink } from "./ApiLink";
import { Image } from "./Image";
import { PublicLink } from "./PublicLink";

/**
 * Representation of a Still additional file.
 */
export interface Still {
  /** CRC32 checksum of this additional file. Format: int32. */
  crc32: number;
  /**
   * Creation mode of the still.
   */
  creationMode: "none" | "sequence" | "single" | "chapter" | "scenedetection";
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
  /** Dictionary of metadata key-value pairs. Requires `select-still: Metadata` header to be returned. */
  metadata: { [key: string]: string };
  /** Offset of the still. Format: double. */
  offset: number;
  /** The preview of the still. */
  preview: string | null;
  /** List of purposes for this additional file. Filter with `select-filter-purposes` header. */
  purposes: string[];
  /** Custom XML tag of the additional file. Not returned by default — request with `select-still: Tag`. */
  tag: string;
  /** Timestamp of the still. Format: double. */
  timeStamp: number;
  /**
   * Type of this additional file. Can be filtered via `select-additionalfile-type` header.
   */
  type: AdditionalFileType;
  /** Path to the file content. URL is valid for four hours. Not returned by default — request with `select-additionalfile: Uri`. */
  uri: string;
  /** List of usages for this additional file. Filter with `select-additionalfile-usage` header. */
  usages: string[];
  _links: StillLinks;
  _embedded?: {
    [K in Exclude<keyof StillLinks, "self">]?: StillLinks[K] extends ApiLink<
      infer R
    >
      ? R
      : never;
  };
}

/**
 * HAL `_links` for {@link Still}.
 */
export interface StillLinks {
  self: ApiLink;
  publiclink: ApiLink<PublicLink>;
  mainpreview: ApiLink<Image>;
  filepreviews: ApiLink<AdditionalFilePreviewCollection>;
}
