import { ApiLink } from "./ApiLink";

export interface DownloadLinkTargetCollection {
  items: object[];
  _links: DownloadLinkTargetCollectionLinks;
}

export interface DownloadLinkTargetCollectionLinks {
  self: ApiLink;
}
