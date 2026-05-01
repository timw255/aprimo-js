import { PmPagedLinks } from "./PmPagedCollection";

export interface ActivityMilestone {
  activityDateId: number;
  activityId: number;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  scheduleType?: number;
  timeZone?: number;
  milestoneEaId?: number;
  _links?: PmPagedLinks;
}
