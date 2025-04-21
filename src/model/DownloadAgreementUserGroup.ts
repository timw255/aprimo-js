import { ApiLink } from "./ApiLink";
import { UserGroup } from "./UserGroup";

export interface DownloadAgreementUserGroup {
  id: string;
  _links: DownloadAgreementUserGroupLinks;
  _embedded?: {
    [K in Exclude<
      keyof DownloadAgreementUserGroupLinks,
      "self"
    >]?: DownloadAgreementUserGroupLinks[K] extends ApiLink<infer R>
      ? R
      : never;
  };
}

export interface DownloadAgreementUserGroupLinks {
  self: ApiLink;
  target: ApiLink<UserGroup>;
}
