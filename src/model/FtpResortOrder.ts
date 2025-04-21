import { ApiLink } from "./ApiLink";
import { OrderTargetCollection } from "./OrderTargetCollection";
import { User } from "./User";

export interface FtpResortOrder {
  createdOn: string;
  creatorEmail: string;
  deliveredFiles: string[];
  disableNotification: boolean;
  earliestStartDate: string;
  executionTime: string;
  failedTargetsCount: number;
  id: string;
  message: string;
  orderType: string;
  priority: string;
  startedOn: string;
  status: string;
  totalFileSize: number;
  type: string;
  _links: FtpResortOrderLinks;
  _embedded?: {
    [K in Exclude<
      keyof FtpResortOrderLinks,
      "self"
    >]?: FtpResortOrderLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface FtpResortOrderLinks {
  self: ApiLink;
  targets: ApiLink<OrderTargetCollection>;
  createdby: ApiLink<User>;
}
