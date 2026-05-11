import { ApiLink } from "./ApiLink";
import { SharedDownloadLinkFile } from "./SharedDownloadLinkFile";

/**
 * Representation of a non-paged collection of SharedDownloadLinkFile items.
 */
export interface SharedDownloadLinkFileCollection {
  /** A collection of shared download link file items. */
  items: SharedDownloadLinkFile[];
  _links: SharedDownloadLinkFileCollectionLinks;
}

export interface SharedDownloadLinkFileCollectionLinks {
  self: ApiLink;
}
