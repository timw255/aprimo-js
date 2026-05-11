import { ApiLink } from "./ApiLink";

/**
 * A collection of download link targets. Items can be heterogeneous (ExportAuditDownloadLinkTarget,
 * ExportMetadataDownloadLinkTarget, OrderDownloadLinkTarget, etc.) depending on the source
 * download link.
 */
export interface DownloadLinkTargetCollection {
  /**
   * A collection of download link target items (ExportAuditDownloadLinkTarget,
   * ExportMetadataDownloadLinkTarget, etc).
   */
  items: object[];
  _links: DownloadLinkTargetCollectionLinks;
}

export interface DownloadLinkTargetCollectionLinks {
  self: ApiLink;
}
