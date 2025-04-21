import { ApiLink } from "./ApiLink";
import { ExportMetadataDownloadLinkTarget } from "./ExportMetadataDownloadLinkTarget";

export interface ExportMetadataDownloadLinkTargetCollection {
  items: ExportMetadataDownloadLinkTarget[];
  _links: ExportMetadataDownloadLinkTargetCollectionLinks;
}

export interface ExportMetadataDownloadLinkTargetCollectionLinks {
  self: ApiLink;
}
