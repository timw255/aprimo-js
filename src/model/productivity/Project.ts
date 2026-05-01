import { PmPagedLinks } from "./PmPagedCollection";

export interface Project {
  projectId: number;
  activityId?: number;
  title: string;
  description?: string;
  beginDate?: string;
  endDate?: string;
  workflowId?: number;
  projectStatus?: number;
  projectManager?: number;
  modifiedDate?: string;
  modifiedUser?: number;
  enableAlap?: number;
  timeZoneId?: number;
  projectScalingTypeId?: number;
  digitalAssetLocation?: number;
  changeOrder?: boolean;
  useDamAssetAccessList?: number;
  useFloat?: number;
  healthIndicatorDate?: string;
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  _links?: PmPagedLinks;
}
