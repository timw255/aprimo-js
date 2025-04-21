import { ApiLink } from "./ApiLink";

export interface ExportAuditDownloadLinkTarget {
  id: string;
  recordId: string;
  status: string;
  _links: ExportAuditDownloadLinkTargetLinks;
}

export interface ExportAuditDownloadLinkTargetLinks {
  self: ApiLink;
}
