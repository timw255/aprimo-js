import { ApiLink } from "./ApiLink";
import { DownloadAgreementClassificationCollection } from "./DownloadAgreementClassificationCollection";
import { DownloadAgreementContentCollection } from "./DownloadAgreementContentCollection";
import { DownloadAgreementUserGroupCollection } from "./DownloadAgreementUserGroupCollection";

export interface DownloadAgreement {
  createdOn: string;
  enabled: boolean;
  id: number;
  modifiedOn: string;
  _links: DownloadAgreementLinks;
  _embedded?: {
    [K in Exclude<
      keyof DownloadAgreementLinks,
      "self"
    >]?: DownloadAgreementLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface DownloadAgreementLinks {
  self: ApiLink;
  contents: ApiLink<DownloadAgreementContentCollection>;
  usergroups: ApiLink<DownloadAgreementUserGroupCollection>;
  classifications: ApiLink<DownloadAgreementClassificationCollection>;
}
