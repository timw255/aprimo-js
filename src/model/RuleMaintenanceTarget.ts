import { ApiLink } from "./ApiLink";

export interface RuleMaintenanceTarget {
  attempt: number;
  errorDetails: string;
  executionTime: string;
  forceRetry: boolean;
  id: string;
  message: string;
  objectId: string;
  ruleTarget: string;
  status: string;
  tag: string;
  _links: RuleMaintenanceTargetLinks;
}

export interface RuleMaintenanceTargetLinks {
  self: ApiLink;
}
