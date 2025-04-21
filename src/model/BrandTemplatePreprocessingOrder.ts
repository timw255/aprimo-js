import { ApiLink } from "./ApiLink";
import { OrderTargetCollection } from "./OrderTargetCollection";
import { User } from "./User";

export interface BrandTemplatePreprocessingOrder {
  id: string;
  createdOn: string;
  creatorEmail: string;
  deliveredFiles: string[];
  disableNotification: boolean;
  failedTargetsCount: number;
  orderType: string;
  priority: string;
  status: string;
  totalFileSize: number;
  type: string;
  _links: BrandTemplatePreprocessingOrderLinks;
  _embedded?: {
    [K in Exclude<
      keyof BrandTemplatePreprocessingOrderLinks,
      "self"
    >]?: BrandTemplatePreprocessingOrderLinks[K] extends ApiLink<infer R>
      ? R
      : never;
  };
}

export interface BrandTemplatePreprocessingOrderLinks {
  self: ApiLink;
  targets: ApiLink<OrderTargetCollection>;
  createdby: ApiLink<User>;
}
