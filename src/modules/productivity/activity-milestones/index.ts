import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { ActivityMilestone } from "../../../model/productivity/ActivityMilestone";

export interface CreateActivityMilestoneRequest {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  activityId: number;
  milestoneEaId?: number;
}

export const activityMilestones = (client: HttpClient) => ({
  create: async (
    activityId: number | string,
    request: CreateActivityMilestoneRequest,
  ): Promise<ApiResult<ActivityMilestone>> => {
    return client.post(`/api/activities/milestone/${activityId}`, request);
  },
});
