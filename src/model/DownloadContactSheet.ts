import { ApiLink } from "./ApiLink";
import { OrderTargetCollection } from "./OrderTargetCollection";
import { User } from "./User";

export interface DownloadContactSheet {
  createdOn: string;
  creatorEmail: string;
  deliveredFiles: string[];
  disableNotification: boolean;
  earliestStartDate: string;
  executionTime: string;
  failedTargetsCount: number;
  id: string;
  message: string;
  notificationThresholdInSeconds: number;
  orderType: string;
  priority: string;
  startedOn: string;
  status: string;
  totalFileSize: number;
  type: string;
  useCDN: string;
  _links: DownloadContactSheetLinks;
  _embedded?: {
    [K in Exclude<
      keyof DownloadContactSheetLinks,
      "self"
    >]?: DownloadContactSheetLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface DownloadContactSheetLinks {
  self: ApiLink;
  targets: ApiLink<OrderTargetCollection>;
  createdby: ApiLink<User>;
}
