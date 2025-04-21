import { ApiLink } from "./ApiLink";
import { OrderTargetCollection } from "./OrderTargetCollection";
import { User } from "./User";

export interface PublicCdnOrder {
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
  _links: PublicCdnOrderLinks;
  _embedded?: {
    [K in Exclude<
      keyof PublicCdnOrderLinks,
      "self"
    >]?: PublicCdnOrderLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface PublicCdnOrderLinks {
  self: ApiLink;
  targets: ApiLink<OrderTargetCollection>;
  createdby: ApiLink<User>;
}
