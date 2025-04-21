import { ApiLink } from "./ApiLink";
import { DownloadAgreementUserGroup } from "./DownloadAgreementUserGroup";

export interface DownloadAgreementUserGroupCollection {
  items: DownloadAgreementUserGroup[];
  _links: DownloadAgreementUserGroupCollectionLinks;
}

export interface DownloadAgreementUserGroupCollectionLinks {
  self: ApiLink;
}
