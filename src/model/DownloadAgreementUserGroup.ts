import { ApiLink } from "./ApiLink";
import { UserGroup } from "./UserGroup";

/**
 * Representation of a download agreement's user group — links a download agreement to a user
 * group that it applies to.
 */
export interface DownloadAgreementUserGroup {
  /** Gets the Id of this user group. */
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
