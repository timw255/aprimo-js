import { ApiLink } from "./ApiLink";
import { DownloadAgreementClassification } from "./DownloadAgreementClassification";

/**
 * Representation of a non-paged collection of DownloadAgreementClassification items.
 */
export interface DownloadAgreementClassificationCollection {
  /** A collection of download agreement classification items. */
  items: DownloadAgreementClassification[];
  _links: DownloadAgreementClassificationCollectionLinks;
}

export interface DownloadAgreementClassificationCollectionLinks {
  self: ApiLink;
}
