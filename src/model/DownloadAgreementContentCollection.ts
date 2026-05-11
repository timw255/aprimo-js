import { ApiLink } from "./ApiLink";
import { DownloadAgreementContent } from "./DownloadAgreementContent";

/**
 * Representation of a non-paged collection of DownloadAgreementContent items.
 */
export interface DownloadAgreementContentCollection {
  /** A collection of download agreement content items. */
  items: DownloadAgreementContent[];
  _links: DownloadAgreementContentCollectionLinks;
}

export interface DownloadAgreementContentCollectionLinks {
  self: ApiLink;
}
