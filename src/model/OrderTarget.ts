import { ApiLink } from "./ApiLink";
import { OrderTargetAction } from "./OrderTargetAction";

export interface OrderTarget {
  additionalFileId: string;
  actions: OrderTargetAction[];
  assetType: string;
  attempt: number;
  errorDetails: string;
  executionTime: string;
  fileName: string;
  forceRetry: boolean;
  id: string;
  itemId: string;
  message: string;
  recordId: string;
  recordIds: string[];
  status: string;
  tag: string;
  targetTypes: string[];
  type: string;
  _links: OrderTargetLinks;
}

export interface OrderTargetLinks {
  self: ApiLink;
}
