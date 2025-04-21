import { ApiLink } from "./ApiLink";
import { MaintenanceAction } from "./MaintenanceAction";
import { MaintenanceTargetCollection } from "./MaintenanceTargetCollection";
import { User } from "./User";

export interface MaintenanceJob {
  actions: MaintenanceAction[];
  createdOn: string;
  creatorEmail: string;
  disableNotification: boolean;
  earliestStartDate: string;
  executionTime: string;
  failedTargetsCount: number;
  id: string;
  message: string;
  priority: string;
  startedOn: string;
  status: string;
  type: string;
  _links: MaintenanceJobLinks;
  _embedded?: {
    [K in Exclude<
      keyof MaintenanceJobLinks,
      "self"
    >]?: MaintenanceJobLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface MaintenanceJobLinks {
  self: ApiLink;
  targets: ApiLink<MaintenanceTargetCollection>;
  createdby: ApiLink<User>;
}
