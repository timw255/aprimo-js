import { ApiLink } from "./ApiLink";
import { DownloadAgreementContent } from "./DownloadAgreementContent";

export interface DownloadAgreementContentCollection {
  items: DownloadAgreementContent[];
  _links: DownloadAgreementContentCollectionLinks;
}

export interface DownloadAgreementContentCollectionLinks {
  self: ApiLink;
}
