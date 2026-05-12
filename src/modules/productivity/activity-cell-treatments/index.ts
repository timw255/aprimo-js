import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { ActivityCellTreatment } from "../../../model/productivity/ActivityCellTreatment";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

/** Payload for `activityCellTreatments.create`. */
export interface CreateActivityCellTreatmentRequest {
  /** Cell this treatment is being applied to. */
  activityCellId: number;
  /** Channel id. */
  channelId?: number;
  /** Treatment id assigned to the cell. */
  activityTreatmentId: number;
  /** Optional wave id grouping this cell-treatment with others. */
  activityWaveId?: number;
  /** Share of the cell receiving this treatment (0–100). */
  cellPercentage?: number;
  /** Forecasted response rate as a percent (0–100). */
  estResponseRatePercent?: number;
  /** Ordering position within the cell. */
  sequence: number;
}

/** Payload for `activityCellTreatments.update`. */
export type UpdateActivityCellTreatmentRequest = Partial<CreateActivityCellTreatmentRequest> & {
  /** Optional explicit id echo in the body. */
  activityCellTreatmentId?: number;
};

/**
 * Cell-treatment links — the join between an `ActivityCell` and an
 * `ActivityTreatment`, with the split percentage, forecast, and ordering
 * that bind the two.
 */
export const activityCellTreatments = (client: HttpClient) => ({
  /**
   * List the treatments assigned to a cell.
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.activityCellTreatments.getByCellId(123);
   * ```
   */
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

  /** Fetch a single cell-treatment link by id. */
  getById: async (
    treatmentId: number | string,
  ): Promise<ApiResult<ActivityCellTreatment>> => {
    return client.get(`/api/activity-cell-treatments/${treatmentId}`);
  },

  /** Assign a treatment to a cell. */
  create: async (
    request: CreateActivityCellTreatmentRequest,
  ): Promise<ApiResult<ActivityCellTreatment>> => {
    return client.post("/api/activity-cell-treatments", request);
  },

  /** Update an existing cell-treatment link. */
  update: async (
    treatmentId: number | string,
    request: UpdateActivityCellTreatmentRequest,
  ): Promise<ApiResult<ActivityCellTreatment>> => {
    return client.put(`/api/activity-cell-treatments/${treatmentId}`, request);
  },

  /** Remove a treatment from a cell. */
  delete: async (treatmentId: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/activity-cell-treatments/${treatmentId}`);
  },
});
