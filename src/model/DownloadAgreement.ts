import { ApiLink } from "./ApiLink";
import { DownloadAgreementClassificationCollection } from "./DownloadAgreementClassificationCollection";
import { DownloadAgreementContentCollection } from "./DownloadAgreementContentCollection";
import { DownloadAgreementUserGroupCollection } from "./DownloadAgreementUserGroupCollection";

/**
 * Representation of a download agreement, a policy that users need to accept before they can
 * download content.
 */
export interface DownloadAgreement {
  /** Gets the creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** Is the download agreement enabled. */
  enabled: boolean;
  /** Gets the Id of this download agreement. Format: int32. */
  id: number;
  /** Gets the last modification datetime in UTC time. Format: date-time. */
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
