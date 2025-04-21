import { ApiLink } from "./ApiLink";
import { OrderTargetCollection } from "./OrderTargetCollection";
import { User } from "./User";

export interface DownloadOrder {
  createdOn: string;
  creatorEmail: string;
  deliveredFiles: string[];
  disableNotification: boolean;
  disableProcessing: string;
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
  _links: DownloadOrderLinks;
  _embedded?: {
    [K in Exclude<
      keyof DownloadOrderLinks,
      "self"
    >]?: DownloadOrderLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface DownloadOrderLinks {
  self: ApiLink;
  targets: ApiLink<OrderTargetCollection>;
  createdby: ApiLink<User>;
}
