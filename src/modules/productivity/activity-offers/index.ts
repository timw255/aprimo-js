import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { ActivityOffer } from "../../../model/productivity/ActivityOffer";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

/** Payload for `activityOffers.create`. */
export interface CreateActivityOfferRequest {
  /** Activity receiving the offer. */
  activityId: number;
  /** Existing offer id to attach to the activity. */
  offerId: number;
}

/** Payload for `activityOffers.update`. */
export interface UpdateActivityOfferRequest {
  /** Optional explicit link id echo in the body. */
  activityOfferId?: number;
  /** Offer id (typically immutable after create). */
  offerId?: number;
  /** Activity id (typically immutable after create). */
  activityId?: number;
  /** Override title of the embedded offer. */
  title?: string;
  /** Override offer code. */
  offerCode?: string;
  /** Override description. */
  description?: string;
  /** Override active-window start. */
  beginDate?: string;
  /** Override active-window end. */
  expirationDate?: string;
  /** Expected revenue per offer (currency per the activity). */
  revenuePerOffer?: number;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
}

/** Activity↔offer links. Attaches existing offers to activities. */
export const activityOffers = (client: HttpClient) => ({
  /**
   * List offers attached to an activity. The `_embedded` key may be
   * `activity-offer` (single) or `activity-offers` (plural) depending on
   * server response.
   */
  getByActivityId: async (
    activityId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<ActivityOffer, "activity-offers" | "activity-offer">>> => {
    return client.get(
      `/api/activities/${activityId}/activity-offers${buildQueryString(params)}`,
    );
  },

  /** Fetch a single activity-offer link by id. */
  getById: async (id: number | string): Promise<ApiResult<ActivityOffer>> => {
    return client.get(`/api/activity-offers/${id}`);
  },

  /**
   * Attach an existing offer to an activity.
   *
   * @example
   * ```ts
   * await aprimo.productivity.activityOffers.create({ activityId: 501, offerId: 42 });
   * ```
   */
  create: async (
    request: CreateActivityOfferRequest,
  ): Promise<ApiResult<ActivityOffer>> => {
    return client.post("/api/activity-offers", request);
  },

  /** Update the activity-offer link or its embedded offer overrides. */
  update: async (
    id: number | string,
    request: UpdateActivityOfferRequest,
  ): Promise<ApiResult<ActivityOffer>> => {
    return client.put(`/api/activity-offers/${id}`, request);
  },

  /** Detach the offer from the activity. */
  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/activity-offers/${id}`);
  },
});
