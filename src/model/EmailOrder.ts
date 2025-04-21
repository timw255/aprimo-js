import { ApiLink } from "./ApiLink";
import { OrderTargetCollection } from "./OrderTargetCollection";
import { User } from "./User";

export interface EmailOrder {
  createdOn: string;
  creatorEmail: string;
  deliveredFiles: string[];
  disableNotification: boolean;
  earliestStartDate: string;
  emailBody: string;
  emailRecipients: string[];
  emailSubject: string;
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
  useCDN: string;
  _links: EmailOrderLinks;
  _embedded?: {
    [K in Exclude<
      keyof EmailOrderLinks,
      "self"
    >]?: EmailOrderLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface EmailOrderLinks {
  self: ApiLink;
  targets: ApiLink<OrderTargetCollection>;
  createdby: ApiLink<User>;
}
