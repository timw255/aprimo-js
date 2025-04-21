import { ApiLink } from "./ApiLink";
import { SharedDownloadLinkFile } from "./SharedDownloadLinkFile";

export interface SharedDownloadLinkFileCollection {
  items: SharedDownloadLinkFile[];
  _links: SharedDownloadLinkFileCollectionLinks;
}

export interface SharedDownloadLinkFileCollectionLinks {
  self: ApiLink;
}
