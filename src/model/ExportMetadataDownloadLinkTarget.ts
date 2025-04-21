import { ApiLink } from "./ApiLink";

export interface ExportMetadataDownloadLinkTarget {
  id: string;
  objectId: string;
  status: string;
  _links: ExportMetadataDownloadLinkTargetLinks;
}

export interface ExportMetadataDownloadLinkTargetLinks {
  self: ApiLink;
}
