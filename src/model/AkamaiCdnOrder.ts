import { ApiLink } from "./ApiLink";
import { OrderTargetCollection } from "./OrderTargetCollection";
import { User } from "./User";

export interface AkamaiCdnOrder {
  createdOn: string;
  creatorEmail: string;
  deliveredFiles: object[];
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
  _links: AkamaiCdnOrderLinks;
  _embedded?: {
    [K in Exclude<
      keyof AkamaiCdnOrderLinks,
      "self"
    >]?: AkamaiCdnOrderLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface AkamaiCdnOrderLinks {
  self: ApiLink;
  targets: ApiLink<OrderTargetCollection>;
  createdby: ApiLink<User>;
}
