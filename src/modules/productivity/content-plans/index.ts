import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { AccessListEntry } from "../../../model/productivity/AccessListEntry";
import {
  ContentPlan,
  ContentPlanManageActivities,
} from "../../../model/productivity/ContentPlan";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export interface UpdateContentPlanRequest {
  multipleValueExtendedAttributes?: unknown[];
  [key: string]: unknown;
}

export interface AddContentPlanActivitiesRequest {
  activities: number[];
}

export interface ShareContentPlanRequest {
  AccessList: AccessListEntry[];
}

export const contentPlans = (client: HttpClient) => ({
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<ContentPlan, "content-plan" | "content-plans">>> => {
    return client.get(`/api/content-plans${buildQueryString(params)}`);
  },

  getById: async (id: number | string): Promise<ApiResult<ContentPlan>> => {
    return client.get(`/api/content-plans/${id}`);
  },

  getManageActivities: async (
    id: number | string,
  ): Promise<ApiResult<ContentPlanManageActivities>> => {
    return client.get(`/api/content-plans/${id}/manage-activities`);
  },

  update: async (
    id: number | string,
    request: UpdateContentPlanRequest,
  ): Promise<ApiResult<ContentPlan>> => {
    return client.put(`/api/content-plans/${id}`, request);
  },

  addActivities: async (
    id: number | string,
    request: AddContentPlanActivitiesRequest,
  ): Promise<ApiResult<unknown>> => {
    return client.post(`/api/content-plans/${id}/activities`, request);
  },

  share: async (
    id: number | string,
    request: ShareContentPlanRequest,
  ): Promise<ApiResult<unknown>> => {
    return client.post(`/api/content-plans/${id}/share`, request);
  },
});
