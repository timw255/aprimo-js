import { ApiLink } from "./ApiLink";

export interface SharedDownloadLinkFile {
  fileName: string;
  fileSize: number;
  id: number;
  sourceFileCount: number;
  _links: SharedDownloadLinkFileLinks;
}

export interface SharedDownloadLinkFileLinks {
  self: ApiLink;
}
