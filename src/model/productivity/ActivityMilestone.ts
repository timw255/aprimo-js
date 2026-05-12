import { PmPagedLinks } from "./PmPagedCollection";

/** A milestone on a PM activity. */
export interface ActivityMilestone {
  /** Stable numeric identifier (called `activityDateId` server-side). */
  activityDateId: number;
  /** Owning activity id. */
  activityId: number;
  /** Display title. */
  title: string;
  /** Long-form description. */
  description?: string;
  /** Window start. */
  startDate?: string;
  /** Window end. */
  endDate?: string;
  /** Schedule-type discriminator. */
  scheduleType?: number;
  /** Time-zone id. */
  timeZone?: number;
  /** Extended-attribute id classifying the milestone, if applicable. */
  milestoneEaId?: number;
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
