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

/**
 * Payload for `contentPlans.update`. Open-ended — the underlying API
 * accepts plan-specific extras beyond `multipleValueExtendedAttributes`.
 */
export interface UpdateContentPlanRequest {
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** Open-ended additional fields per tenant config. */
  [key: string]: unknown;
}

/** Payload for `contentPlans.addActivities`. */
export interface AddContentPlanActivitiesRequest {
  /** Activity ids to attach to the plan. */
  activities: number[];
}

/** Payload for `contentPlans.share`. */
export interface ShareContentPlanRequest {
  /** Access-list entries to merge into the plan's visibility list. */
  AccessList: AccessListEntry[];
}

/**
 * Content plans — calendar-style planning surfaces that group activities
 * for coordinated execution. Plans carry their own access list (`share`)
 * and can be inspected for the activities they manage (`getManageActivities`).
 */
export const contentPlans = (client: HttpClient) => ({
  /** List content plans. */
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<ContentPlan, "content-plan" | "content-plans">>> => {
    return client.get(`/api/content-plans${buildQueryString(params)}`);
  },

  /** Fetch a single content plan by id. */
  getById: async (id: number | string): Promise<ApiResult<ContentPlan>> => {
    return client.get(`/api/content-plans/${id}`);
  },

  /**
   * List the activities this plan is allowed to manage. Used to drive
   * "add activities" pickers in the UI.
   */
  getManageActivities: async (
    id: number | string,
  ): Promise<ApiResult<ContentPlanManageActivities>> => {
    return client.get(`/api/content-plans/${id}/manage-activities`);
  },

  /** Update an existing content plan. */
  update: async (
    id: number | string,
    request: UpdateContentPlanRequest,
  ): Promise<ApiResult<ContentPlan>> => {
    return client.put(`/api/content-plans/${id}`, request);
  },

  /** Attach activities to a content plan. */
  addActivities: async (
    id: number | string,
    request: AddContentPlanActivitiesRequest,
  ): Promise<ApiResult<unknown>> => {
    return client.post(`/api/content-plans/${id}/activities`, request);
  },

  /**
   * Share a content plan by extending its access list.
   *
   * @example
   * ```ts
   * await aprimo.productivity.contentPlans.share(42, {
   *   AccessList: [{ objectId: 42, userId: 1234, hasEditRight: 1 }],
   * });
   * ```
   */
  share: async (
    id: number | string,
    request: ShareContentPlanRequest,
  ): Promise<ApiResult<unknown>> => {
    return client.post(`/api/content-plans/${id}/share`, request);
  },
});
