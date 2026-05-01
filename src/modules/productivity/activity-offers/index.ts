import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { ActivityOffer } from "../../../model/productivity/ActivityOffer";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export interface CreateActivityOfferRequest {
  activityId: number;
  offerId: number;
}

export interface UpdateActivityOfferRequest {
  activityOfferId?: number;
  offerId?: number;
  activityId?: number;
  title?: string;
  offerCode?: string;
  description?: string;
  beginDate?: string;
  expirationDate?: string;
  revenuePerOffer?: number;
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
}

export const activityOffers = (client: HttpClient) => ({
  getByActivityId: async (
    activityId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<ActivityOffer, "activity-offers" | "activity-offer">>> => {
    return client.get(
      `/api/activities/${activityId}/activity-offers${buildQueryString(params)}`,
    );
  },

  getById: async (id: number | string): Promise<ApiResult<ActivityOffer>> => {
    return client.get(`/api/activity-offers/${id}`);
  },

  create: async (
    request: CreateActivityOfferRequest,
  ): Promise<ApiResult<ActivityOffer>> => {
    return client.post("/api/activity-offers", request);
  },

  update: async (
    id: number | string,
    request: UpdateActivityOfferRequest,
  ): Promise<ApiResult<ActivityOffer>> => {
    return client.put(`/api/activity-offers/${id}`, request);
  },

  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/activity-offers/${id}`);
  },
});
