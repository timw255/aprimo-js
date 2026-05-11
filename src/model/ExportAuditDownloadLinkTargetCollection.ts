import { ApiLink } from "./ApiLink";
import { ExportAuditDownloadLinkTarget } from "./ExportAuditDownloadLinkTarget";

/**
 * Representation of a non-paged collection of ExportAuditDownloadLinkTarget items.
 */
export interface ExportAuditDownloadLinkTargetCollection {
  /** A collection of export audit download link target items. */
  items: ExportAuditDownloadLinkTarget[];
  _links: ExportAuditDownloadLinkTargetCollectionLinks;
}

export interface ExportAuditDownloadLinkTargetCollectionLinks {
  self: ApiLink;
}
