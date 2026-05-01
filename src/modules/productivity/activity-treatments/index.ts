import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { ActivityTreatment } from "../../../model/productivity/ActivityTreatment";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export interface CreateActivityTreatmentRequest {
  activityId: number;
  treatmentId: number;
}

export interface UpdateActivityTreatmentRequest {
  activityTreatmentId?: number;
  treatmentId?: number;
  activityId?: number;
  title?: string;
  description?: string;
  treatmentCode?: string;
  typeId?: number;
  channelId?: number;
  activeFlag?: number;
  activitySpecific?: number;
  currencyCode?: number;
  assignedActivityIds?: number[];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
}

export const activityTreatments = (client: HttpClient) => ({
  getByActivityId: async (
    activityId: number | string,
    params?: PmQueryParams,
  ): Promise<
    ApiResult<PmPagedCollection<ActivityTreatment, "activity-treatment" | "activity-treatments">>
  > => {
    return client.get(
      `/api/activities/${activityId}/activity-treatments${buildQueryString(params)}`,
    );
  },

  getById: async (
    id: number | string,
  ): Promise<ApiResult<ActivityTreatment>> => {
    return client.get(`/api/activity-treatments/${id}`);
  },

  create: async (
    request: CreateActivityTreatmentRequest,
  ): Promise<ApiResult<ActivityTreatment>> => {
    return client.post("/api/activity-treatments/", request);
  },

  update: async (
    id: number | string,
    request: UpdateActivityTreatmentRequest,
  ): Promise<ApiResult<ActivityTreatment>> => {
    return client.put(`/api/activity-treatments/${id}`, request);
  },

  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/activity-treatments/${id}`);
  },
});
