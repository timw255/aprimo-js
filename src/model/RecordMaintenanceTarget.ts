import { ApiLink } from "./ApiLink";

export interface RecordMaintenanceTarget {
  attempt: number;
  errorDetails: string;
  executionTime: string;
  forceRetry: boolean;
  id: string;
  message: string;
  recordId: string;
  status: string;
  tag: string;
  _links: RecordMaintenanceTargetLinks;
}

export interface RecordMaintenanceTargetLinks {
  self: ApiLink;
}
