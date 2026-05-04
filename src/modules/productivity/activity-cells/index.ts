import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { ActivityCell } from "../../../model/productivity/ActivityCell";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export interface CreateActivityCellRequest {
  title: string;
  description?: string;
  activityId: number;
  code?: string;
  sourceCode?: string;
  estimatedQuantity?: number;
  actualQuantity?: number;
  actualResponse?: number;
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
}

export type UpdateActivityCellRequest = Partial<CreateActivityCellRequest> & {
  activityCellId?: number;
};

export const activityCells = (client: HttpClient) => ({
  getByActivityId: async (
    activityId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<ActivityCell, "activity-cell">>> => {
    return client.get(
      `/api/activities/${activityId}/activity-cells${buildQueryString(params)}`,
    );
  },

  getById: async (cellId: number | string): Promise<ApiResult<ActivityCell>> => {
    return client.get(`/api/activity-cells/${cellId}`);
  },

  create: async (
    request: CreateActivityCellRequest,
  ): Promise<ApiResult<ActivityCell>> => {
    return client.post("/api/activity-cells", request);
  },

  update: async (
    cellId: number | string,
    request: UpdateActivityCellRequest,
  ): Promise<ApiResult<ActivityCell>> => {
    return client.put(`/api/activity-cells/${cellId}`, request);
  },

  delete: async (cellId: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/activity-cells/${cellId}`);
  },
});
