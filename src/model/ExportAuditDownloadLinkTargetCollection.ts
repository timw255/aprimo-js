import { ApiLink } from "./ApiLink";
import { ExportAuditDownloadLinkTarget } from "./ExportAuditDownloadLinkTarget";

export interface ExportAuditDownloadLinkTargetCollection {
  items: ExportAuditDownloadLinkTarget[];
  _links: ExportAuditDownloadLinkTargetCollectionLinks;
}

export interface ExportAuditDownloadLinkTargetCollectionLinks {
  self: ApiLink;
}
