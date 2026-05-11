import { ApiLink } from "./ApiLink";
import { DownloadAgreementUserGroup } from "./DownloadAgreementUserGroup";

/**
 * Representation of a non-paged collection of DownloadAgreementUserGroup items.
 */
export interface DownloadAgreementUserGroupCollection {
  /** A collection of download agreement user group items. */
  items: DownloadAgreementUserGroup[];
  _links: DownloadAgreementUserGroupCollectionLinks;
}

export interface DownloadAgreementUserGroupCollectionLinks {
  self: ApiLink;
}
