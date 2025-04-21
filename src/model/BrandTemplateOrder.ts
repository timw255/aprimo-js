import { ApiLink } from "./ApiLink";
import { OrderTargetCollection } from "./OrderTargetCollection";
import { User } from "./User";

export interface BrandTemplateOrder {
  id: string;
  createdOn: string;
  creatorEmail: string;
  customizationId: string;
  deliveredFiles: string[];
  disableNotification: boolean;
  failedTargetsCount: number;
  orderType: string;
  presets: string[];
  priority: string;
  status: string;
  totalFileSize: number;
  type: string;
  _links: BrandTemplateOrderLinks;
  _embedded?: {
    [K in Exclude<
      keyof BrandTemplateOrderLinks,
      "self"
    >]?: BrandTemplateOrderLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface BrandTemplateOrderLinks {
  self: ApiLink;
  targets: ApiLink<OrderTargetCollection>;
  createdby: ApiLink<User>;
}
