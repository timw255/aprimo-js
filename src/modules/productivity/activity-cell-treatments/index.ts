import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { ActivityCellTreatment } from "../../../model/productivity/ActivityCellTreatment";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export interface CreateActivityCellTreatmentRequest {
  activityCellId: number;
  channelId?: number;
  activityTreatmentId: number;
  activityWaveId?: number;
  cellPercentage?: number;
  estResponseRatePercent?: number;
  sequence: number;
}

export type UpdateActivityCellTreatmentRequest = Partial<CreateActivityCellTreatmentRequest> & {
  activityCellTreatmentId?: number;
};

export const activityCellTreatments = (client: HttpClient) => ({
  getByCellId: async (
    cellId: number | string,
    params?: PmQueryParams,
  ): Promise<
    ApiResult<PmPagedCollection<ActivityCellTreatment, "activity-cell-treatment">>
  > => {
    return client.get(
      `/api/activity-cells/${cellId}/activity-cell-treatments${buildQueryString(params)}`,
    );
  },

  getById: async (
    treatmentId: number | string,
  ): Promise<ApiResult<ActivityCellTreatment>> => {
    return client.get(`/api/activity-cell-treatments/${treatmentId}`);
  },

  create: async (
    request: CreateActivityCellTreatmentRequest,
  ): Promise<ApiResult<ActivityCellTreatment>> => {
    return client.post("/api/activity-cell-treatments", request);
  },

  update: async (
    treatmentId: number | string,
    request: UpdateActivityCellTreatmentRequest,
  ): Promise<ApiResult<ActivityCellTreatment>> => {
    return client.put(`/api/activity-cell-treatments/${treatmentId}`, request);
  },

  delete: async (treatmentId: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/activity-cell-treatments/${treatmentId}`);
  },
});
