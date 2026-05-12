import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { ActivityMilestone } from "../../../model/productivity/ActivityMilestone";

/** Payload for `activityMilestones.create`. */
export interface CreateActivityMilestoneRequest {
  /** Display title for the milestone. */
  title: string;
  /** Long-form description. */
  description?: string;
  /** Start of the milestone window. */
  startDate: string;
  /** End of the milestone window. */
  endDate: string;
  /** Owning activity id (also encoded in the URL path). */
  activityId: number;
  /** Extended-attribute id classifying the milestone, if applicable. */
  milestoneEaId?: number;
}

/** Milestones on a PM activity — named date markers on its timeline. */
export const activityMilestones = (client: HttpClient) => ({
  /**
   * Add a milestone to an activity.
   *
   * @param activityId - The parent activity id (also passed in `request.activityId`).
   *
   * @example
   * ```ts
   * await aprimo.productivity.activityMilestones.create(501, {
   *   title: "Kickoff",
   *   startDate: "2026-03-01T00:00:00",
   *   endDate:   "2026-03-01T17:00:00",
   *   activityId: 501,
   * });
   * ```
   */
  create: async (
    activityId: number | string,
    request: CreateActivityMilestoneRequest,
  ): Promise<ApiResult<ActivityMilestone>> => {
    return client.post(`/api/activities/milestone/${activityId}`, request);
  },
});
