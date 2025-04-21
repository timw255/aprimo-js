import { ApiLink } from "./ApiLink";
import { OrderTargetCollection } from "./OrderTargetCollection";
import { User } from "./User";

export interface ShareDownloadLinkOrder {
  createdOn: string;
  creatorEmail: string;
  deliveredFiles: string[];
  disableNotification: boolean;
  earliestStartDate: string;
  emailBody: string;
  emailRecipients: string[];
  executionTime: string;
  failedTargetsCount: number;
  id: string;
  message: string;
  orderType: string;
  priority: string;
  sendEmail: boolean;
  sharedDownloadLinkId: string;
  shareUri: string;
  startedOn: string;
  status: string;
  totalFileSize: number;
  type: string;
  _links: ShareDownloadLinkOrderLinks;
  _embedded?: {
    [K in Exclude<
      keyof ShareDownloadLinkOrderLinks,
      "self"
    >]?: ShareDownloadLinkOrderLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface ShareDownloadLinkOrderLinks {
  self: ApiLink;
  targets: ApiLink<OrderTargetCollection>;
  createdby: ApiLink<User>;
}
