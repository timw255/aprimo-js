import { ApiLink } from "./ApiLink";
import { ExportMetadataDownloadLinkTarget } from "./ExportMetadataDownloadLinkTarget";

/**
 * Representation of a non-paged collection of ExportMetadataDownloadLinkTarget items.
 */
export interface ExportMetadataDownloadLinkTargetCollection {
  /** A collection of export metadata download link target items. */
  items: ExportMetadataDownloadLinkTarget[];
  _links: ExportMetadataDownloadLinkTargetCollectionLinks;
}

export interface ExportMetadataDownloadLinkTargetCollectionLinks {
  self: ApiLink;
}
