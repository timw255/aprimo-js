import { AccessListEntry } from "./AccessListEntry";
import { PmPagedLinks } from "./PmPagedCollection";

export interface ContentPlan {
  planId: number;
  statusId?: number;
  title: string;
  description?: string;
  administratorId?: number;
  beginDate?: string;
  endDate?: string;
  modifiedUserId?: number;
  modifiedDate?: string;
  collections?: unknown[];
  accessList?: AccessListEntry[];
  canRead?: boolean;
  canModify?: boolean;
  canCreateActivity?: boolean;
  canModifyActivity?: boolean;
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  _links?: PmPagedLinks;
}

export interface ContentPlanManageActivities {
  _total: number;
  activities?: unknown[];
  _embedded?: { activities?: unknown[] };
  _links?: PmPagedLinks;
}
