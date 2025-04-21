import { ApiLink } from "./ApiLink";
import { User } from "./User";

export interface ExportAuditMaintenanceJob {
  createdOn: string;
  creatorEmail: string;
  deliveredFile: string;
  disableNotification: boolean;
  earliestStartDate: string;
  executionTime: string;
  exportFileName: string;
  failedTargetsCount: number;
  id: string;
  message: string;
  priority: string;
  startedOn: string;
  status: string;
  type: string;
  _links: ExportAuditMaintenanceJobLinks;
  _embedded?: {
    [K in Exclude<
      keyof ExportAuditMaintenanceJobLinks,
      "self"
    >]?: ExportAuditMaintenanceJobLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface ExportAuditMaintenanceJobLinks {
  self: ApiLink;
  createdby: ApiLink<User>;
}
