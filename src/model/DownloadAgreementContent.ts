import { ApiLink } from "./ApiLink";

export interface DownloadAgreementContent {
  id: number;
  languageId: string;
  termsOfUse: string;
  title: string;
  version: number;
  _links: DownloadAgreementContentLinks;
}

export interface DownloadAgreementContentLinks {
  self: ApiLink;
}
