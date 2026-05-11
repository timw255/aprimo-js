import { ApiLink } from "./ApiLink";

/**
 * Representation of the link to a file included in a shared download link.
 */
export interface SharedDownloadLinkFileDownloadUri {
  /** Gets the actual URL of the shared download link. */
  downloadUri: string;
  /** Gets the file ID. Format: int32. */
  fileId: number;
  /** Gets the unique ID of the shared download link. */
  sharedDownloadLinkId: string;
  _links: SharedDownloadLinkFileDownloadUriLinks;
}

export interface SharedDownloadLinkFileDownloadUriLinks {
  self: ApiLink;
}
