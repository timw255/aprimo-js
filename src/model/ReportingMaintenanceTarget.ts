import { ApiLink } from "./ApiLink";

export interface ReportingMaintenanceTarget {
  attempt: number;
  errorDetails: string;
  executionTime: string;
  forceRetry: boolean;
  id: string;
  message: string;
  objectId: string;
  status: string;
  tag: string;
  _links: ReportingMaintenanceTargetLinks;
}

export interface ReportingMaintenanceTargetLinks {
  self: ApiLink;
}
