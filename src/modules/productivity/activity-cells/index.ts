import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { ActivityCell } from "../../../model/productivity/ActivityCell";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

/** Payload for `activityCells.create`. */
export interface CreateActivityCellRequest {
  /** Display title for the cell. */
  title: string;
  /** Long-form description. */
  description?: string;
  /** Owning activity id. */
  activityId: number;
  /** Cell code used for reporting / matching. */
  code?: string;
  /** Marketing source code attached to the cell. */
  sourceCode?: string;
  /** Forecasted audience size for this cell. */
  estimatedQuantity?: number;
  /** Observed audience size for this cell. */
  actualQuantity?: number;
  /** Observed response count. */
  actualResponse?: number;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
}

/** Payload for `activityCells.update`. */
export type UpdateActivityCellRequest = Partial<CreateActivityCellRequest> & {
  /** Optional explicit id echo in the body. */
  activityCellId?: number;
};

/**
 * Activity cells — segmentation buckets within an activity that pair an
 * audience slice with a set of treatments. The traditional direct-marketing
 * "cell" abstraction.
 */
export const activityCells = (client: HttpClient) => ({
  /**
   * List the cells under an activity.
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.activityCells.getByActivityId(501);
   * ```
   */
  getByActivityId: async (
    activityId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<ActivityCell, "activity-cell">>> => {
    return client.get(
      `/api/activities/${activityId}/activity-cells${buildQueryString(params)}`,
    );
  },

  /** Fetch a single cell by id. */
  getById: async (cellId: number | string): Promise<ApiResult<ActivityCell>> => {
    return client.get(`/api/activity-cells/${cellId}`);
  },

  /**
   * Create a new cell on an activity.
   *
   * @example
   * ```ts
   * await aprimo.productivity.activityCells.create({
   *   title: "Northeast existing customers",
   *   activityId: 501,
   *   estimatedQuantity: 50_000,
   * });
   * ```
   */
  create: async (
    request: CreateActivityCellRequest,
  ): Promise<ApiResult<ActivityCell>> => {
    return client.post("/api/activity-cells", request);
  },

  /** Update an existing cell. */
  update: async (
    cellId: number | string,
    request: UpdateActivityCellRequest,
  ): Promise<ApiResult<ActivityCell>> => {
    return client.put(`/api/activity-cells/${cellId}`, request);
  },

  /** Permanently delete a cell. */
  delete: async (cellId: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/activity-cells/${cellId}`);
  },
});
