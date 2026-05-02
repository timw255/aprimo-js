import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Activity } from "../../../model/productivity/Activity";
import { ActivityMilestone } from "../../../model/productivity/ActivityMilestone";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { PmSearchRequest } from "../../../model/productivity/PmSearchRequest";
import { buildQueryString } from "../../../utils";

export interface CreateActivityRequest {
  name: string;
  description?: string;
  activityTypeId: number;
  activityStateId: number;
  ownerId: number;
  administratorId: number;
  beginDate: string;
  endDate: string;
  visualEndDate?: string;
  currencyCode: number;
  scsId?: number;
  timeZoneId: number;
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
}

export type UpdateActivityRequest = Partial<CreateActivityRequest>;

export interface CreateActivityMilestoneRequest {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  activityId: number;
  milestoneEaId?: number;
}

export type ActivitySearchRequest = PmSearchRequest;

export const activities = (client: HttpClient) => ({
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Activity, "activities" | "activity">>> => {
    return client.get(`/api/activities/${buildQueryString(params)}`);
  },

  getById: async (id: number | string): Promise<ApiResult<Activity>> => {
    return client.get(`/api/activities/${id}`);
  },

  create: async (request: CreateActivityRequest): Promise<ApiResult<Activity>> => {
    return client.post("/api/activities/", request);
  },

  update: async (
    id: number | string,
    request: UpdateActivityRequest,
  ): Promise<ApiResult<Activity>> => {
    return client.put(`/api/activities/${id}`, request);
  },

  search: async (
    request: ActivitySearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Activity, "activities" | "activity">>> => {
    return client.post(`/api/activities/search${buildQueryString(params)}`, request);
  },

  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/activities/${id}`);
  },

  createMilestone: async (
    activityId: number | string,
    request: CreateActivityMilestoneRequest,
  ): Promise<ApiResult<ActivityMilestone>> => {
    return client.post(`/api/activities/milestone/${activityId}`, request);
  },
});
