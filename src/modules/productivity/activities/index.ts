import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Activity } from "../../../model/productivity/Activity";
import { ActivityMilestone } from "../../../model/productivity/ActivityMilestone";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { PmSearchRequest } from "../../../model/productivity/PmSearchRequest";
import { buildQueryString } from "../../../utils";

/**
 * Payload for `activities.create`.
 *
 * `activityTypeId`, `activityStateId`, `currencyCode`, and `timeZoneId`
 * reference tenant-configured ids — look these up via the `systemTypes`
 * module if you don't know them.
 */
export interface CreateActivityRequest {
  /** Display name for the activity. */
  name: string;
  /** Long-form description. */
  description?: string;
  /** Activity type id (tenant-configured, see `systemTypes`). */
  activityTypeId: number;
  /** Initial workflow state id. */
  activityStateId: number;
  /** PM user id that owns the activity. */
  ownerId: number;
  /** PM user id with administrative rights on the activity. */
  administratorId: number;
  /** Start date. */
  beginDate: string;
  /** End date. */
  endDate: string;
  /** Optional separate end date used for visualization (e.g., Gantt). */
  visualEndDate?: string;
  /** Currency code id (tenant-configured). */
  currencyCode: number;
  /** Security context (SCS) id, if the activity is scoped to one. */
  scsId?: number;
  /** Time zone id (tenant-configured). */
  timeZoneId: number;
  /** Extended-attribute values keyed per the tenant's EA configuration. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
}

/** Payload for `activities.update`. Every field is optional. */
export type UpdateActivityRequest = Partial<CreateActivityRequest>;

/** Payload for `activities.createMilestone`. */
export interface CreateActivityMilestoneRequest {
  /** Milestone display title. */
  title: string;
  /** Long-form description. */
  description?: string;
  /** Milestone start. */
  startDate: string;
  /** Milestone end. */
  endDate: string;
  /** Owning activity id (also reflected in the URL path). */
  activityId: number;
  /** Extended-attribute id classifying the milestone, if applicable. */
  milestoneEaId?: number;
}

/** Search payload — uses the generic PM search-tree grammar. */
export type ActivitySearchRequest = PmSearchRequest;

/**
 * Activities. Each has an owner, administrator, currency, and date
 * window, and acts as the parent container for milestones, cells,
 * offers, treatments, programs, projects, and roles.
 */
export const activities = (client: HttpClient) => ({
  /**
   * Fetch a page of activities. Use `params.offset` / `params.limit` to walk
   * the result set; the response is a `PmPagedCollection` keyed under
   * `_embedded.Activity`.
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.activities.get({ limit: 50 });
   * if (res.ok) console.log(res.data?._embedded?.Activity?.length);
   * ```
   */
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Activity, "Activity">>> => {
    return client.get(`/api/activities/${buildQueryString(params)}`);
  },

  /**
   * Fetch a single activity by id.
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.activities.getById(501);
   * ```
   */
  getById: async (id: number | string): Promise<ApiResult<Activity>> => {
    return client.get(`/api/activities/${id}`);
  },

  /**
   * Create a new activity.
   *
   * @param request - Activity payload. See {@link CreateActivityRequest}.
   * @returns The newly-created activity, including its assigned `activityId`.
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.activities.create({
   *   name: "Spring Campaign",
   *   activityTypeId: 100,
   *   activityStateId: 1,
   *   ownerId: 1234,
   *   administratorId: 1234,
   *   beginDate: "2026-03-01T00:00:00",
   *   endDate:   "2026-05-31T00:00:00",
   *   currencyCode: 1,
   *   timeZoneId: 1,
   * });
   * ```
   */
  create: async (request: CreateActivityRequest): Promise<ApiResult<Activity>> => {
    return client.post("/api/activities/", request);
  },

  /**
   * Update an existing activity. Only include fields you want to change.
   *
   * @example
   * ```ts
   * await aprimo.productivity.activities.update(501, { name: "Renamed" });
   * ```
   */
  update: async (
    id: number | string,
    request: UpdateActivityRequest,
  ): Promise<ApiResult<Activity>> => {
    return client.put(`/api/activities/${id}`, request);
  },

  /**
   * Search activities using the PM search-tree grammar. Pair `params` with
   * `offset`/`limit` for paging across large result sets.
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.activities.search({
   *   equals: { fieldName: "name", fieldValue: "Spring Campaign" },
   * });
   * ```
   */
  search: async (
    request: ActivitySearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Activity, "Activity">>> => {
    return client.post(`/api/activities/search${buildQueryString(params)}`, request);
  },

  /**
   * Permanently delete an activity. Cannot be undone.
   *
   * @example
   * ```ts
   * await aprimo.productivity.activities.delete(501);
   * ```
   */
  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/activities/${id}`);
  },

  /**
   * Add a milestone to an activity. The dedicated `activityMilestones`
   * module exposes the same endpoint — this overload is here for callers
   * already working in the activities namespace.
   *
   * @example
   * ```ts
   * await aprimo.productivity.activities.createMilestone(501, {
   *   title: "Kickoff",
   *   startDate: "2026-03-01T00:00:00",
   *   endDate:   "2026-03-01T17:00:00",
   *   activityId: 501,
   * });
   * ```
   */
  createMilestone: async (
    activityId: number | string,
    request: CreateActivityMilestoneRequest,
  ): Promise<ApiResult<ActivityMilestone>> => {
    return client.post(`/api/activities/milestone/${activityId}`, request);
  },
});
