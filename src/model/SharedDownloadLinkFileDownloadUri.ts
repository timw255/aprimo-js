import { ApiLink } from "./ApiLink";

export interface SharedDownloadLinkFileDownloadUri {
  downloadUri: string;
  fileId: number;
  sharedDownloadLinkId: string;
  _links: SharedDownloadLinkFileDownloadUriLinks;
}

export interface SharedDownloadLinkFileDownloadUriLinks {
  self: ApiLink;
}
