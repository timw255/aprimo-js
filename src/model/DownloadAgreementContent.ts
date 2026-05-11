import { ApiLink } from "./ApiLink";

/**
 * Representation of download agreement's content — the localized terms-of-use text shown to users
 * for a particular language version of a download agreement.
 */
export interface DownloadAgreementContent {
  /** Gets the Id of this download agreement's content. Format: int32. */
  id: number;
  /** Language Id on which this download agreement's content is for. */
  languageId: string;
  /** Terms of use for download agreement content. */
  termsOfUse: string;
  /** Download agreement's content title. */
  title: string;
  /** Version of the download agreement content. Format: int32. */
  version: number;
  _links: DownloadAgreementContentLinks;
}

export interface DownloadAgreementContentLinks {
  self: ApiLink;
}
