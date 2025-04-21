import { ApiLink } from "./ApiLink";
import { DownloadAgreementClassification } from "./DownloadAgreementClassification";

export interface DownloadAgreementClassificationCollection {
  items: DownloadAgreementClassification[];
  _links: DownloadAgreementClassificationCollectionLinks;
}

export interface DownloadAgreementClassificationCollectionLinks {
  self: ApiLink;
}
