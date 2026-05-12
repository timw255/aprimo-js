import { PmPagedLinks } from "./PmPagedCollection";

/**
 * An alternate derivative of a {@link DigitalAssetVersion} — proxy,
 * format conversion, watermarked copy, etc. Each rendition carries its
 * own filename, size, and URI.
 */
export interface DigitalAssetRendition {
  /** Stable numeric identifier. */
  renditionId: number;
  /** Parent version id. */
  versionId: number;
  /** Display title. */
  title?: string;
  /** Original file name. */
  filename?: string;
  /** File size in bytes. */
  fileSize?: number;
  /** Direct download URI for the rendition. */
  renditionUri?: string;
  /** Rendition type id. */
  attachmentVersionType?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
