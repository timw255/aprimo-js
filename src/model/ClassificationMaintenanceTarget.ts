import { ApiLink } from "./ApiLink";

export interface ClassificationMaintenanceTarget {
  attempt: number;
  classificationId: string;
  errorDetails: string;
  executionTime: string;
  forceRetry: boolean;
  id: string;
  message: string;
  status: string;
  tag: string;
  _links: ClassificationMaintenanceTargetLinks;
}

export interface ClassificationMaintenanceTargetLinks {
  self: ApiLink;
}
