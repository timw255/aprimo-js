import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { ActivityTreatment } from "../../../model/productivity/ActivityTreatment";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

/** Payload for `activityTreatments.create`. */
export interface CreateActivityTreatmentRequest {
  /** Activity receiving the treatment. */
  activityId: number;
  /** Existing treatment id to attach. */
  treatmentId: number;
}

/** Payload for `activityTreatments.update`. */
export interface UpdateActivityTreatmentRequest {
  /** Optional explicit link id echo in the body. */
  activityTreatmentId?: number;
  /** Treatment id (typically immutable after create). */
  treatmentId?: number;
  /** Activity id (typically immutable after create). */
  activityId?: number;
  /** Override title of the embedded treatment. */
  title?: string;
  /** Override description. */
  description?: string;
  /** Override treatment code. */
  treatmentCode?: string;
  /** Treatment type id. */
  typeId?: number;
  /** Channel id. */
  channelId?: number;
  /** Active flag (`1` = active, `0` = inactive). */
  activeFlag?: number;
  /** Scoped to a single activity vs reusable. */
  activitySpecific?: number;
  /** Currency code id for cost/forecast fields. */
  currencyCode?: number;
  /** Other activities this treatment is assigned to. */
  assignedActivityIds?: number[];
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
}

/** Activity↔treatment links. Attaches existing treatments to activities. */
export const activityTreatments = (client: HttpClient) => ({
  /** List the treatments attached to an activity. */
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

  /** Fetch a single activity-treatment link by id. */
  getById: async (
    id: number | string,
  ): Promise<ApiResult<ActivityTreatment>> => {
    return client.get(`/api/activity-treatments/${id}`);
  },

  /**
   * Attach an existing treatment to an activity.
   *
   * @example
   * ```ts
   * await aprimo.productivity.activityTreatments.create({
   *   activityId: 501,
   *   treatmentId: 88,
   * });
   * ```
   */
  create: async (
    request: CreateActivityTreatmentRequest,
  ): Promise<ApiResult<ActivityTreatment>> => {
    return client.post("/api/activity-treatments/", request);
  },

  /** Update the activity-treatment link or its embedded treatment overrides. */
  update: async (
    id: number | string,
    request: UpdateActivityTreatmentRequest,
  ): Promise<ApiResult<ActivityTreatment>> => {
    return client.put(`/api/activity-treatments/${id}`, request);
  },

  /** Detach a treatment from an activity. */
  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/activity-treatments/${id}`);
  },
});
