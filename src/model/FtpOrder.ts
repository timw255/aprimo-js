import { ApiLink } from "./ApiLink";
import { OrderTargetCollection } from "./OrderTargetCollection";
import { User } from "./User";

export interface FtpOrder {
  connectionType: string;
  createdOn: string;
  creatorEmail: string;
  deliveredFiles: string[];
  disableNotification: boolean;
  earliestStartDate: string;
  executionTime: string;
  failedTargetsCount: number;
  ftpDirectory: string;
  ftpHostname: string;
  ftpPort: number;
  ftpUsername: string;
  id: string;
  message: string;
  orderType: string;
  passiveTransfer: boolean;
  priority: string;
  proxyHostname: string;
  proxyPort: number;
  proxyUsername: string;
  startedOn: string;
  status: string;
  totalFileSize: number;
  type: string;
  _links: FtpOrderLinks;
  _embedded?: {
    [K in Exclude<
      keyof FtpOrderLinks,
      "self"
    >]?: FtpOrderLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface FtpOrderLinks {
  self: ApiLink;
  targets: ApiLink<OrderTargetCollection>;
  createdby: ApiLink<User>;
}
