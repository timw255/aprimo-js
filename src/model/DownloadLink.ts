import { ApiLink } from "./ApiLink";
import { DownloadLinkTargetCollection } from "./DownloadLinkTargetCollection";
import { User } from "./User";

export interface DownloadLink {
  createdOn: string;
  deliveredFiles: string[];
  description: string;
  downloadAgreementIds: number[];
  errorDescription: string;
  failedRecordsCount: number;
  failedTargetsCount: number;
  id: string;
  status: string;
  succeededRecordsCount: number;
  title: string;
  type: string;
  _links: DownloadLinkLinks;
  _embedded?: {
    [K in Exclude<
      keyof DownloadLinkLinks,
      "self"
    >]?: DownloadLinkLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface DownloadLinkLinks {
  self: ApiLink;
  targets: ApiLink<DownloadLinkTargetCollection>;
  createdby: ApiLink<User>;
}
