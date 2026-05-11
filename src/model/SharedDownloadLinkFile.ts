import { ApiLink } from "./ApiLink";

/**
 * Representation of a file included in a shared download link.
 */
export interface SharedDownloadLinkFile {
  /** Gets the file name. */
  fileName: string;
  /** Gets the file size. Format: int64. */
  fileSize: number;
  /** Gets the file ID. Format: int32. */
  id: number;
  /** Gets the amount of files included. Format: int64. */
  sourceFileCount: number;
  _links: SharedDownloadLinkFileLinks;
}

export interface SharedDownloadLinkFileLinks {
  self: ApiLink;
}
