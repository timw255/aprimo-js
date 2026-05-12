import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { AccessListEntry } from "../../../model/productivity/AccessListEntry";
import { Offer } from "../../../model/productivity/Offer";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

/** Payload for `offers.create`. */
export interface CreateOfferRequest {
  /** Display title. */
  title: string;
  /** Offer code used for reporting / matching. */
  offerCode?: string;
  /** Lifecycle status id. */
  statusId?: number;
  /** Long-form description. */
  description?: string;
  /** PM user id of the owner. */
  ownerId?: number;
  /** Active-window start. */
  beginDate?: string;
  /** Active-window end. */
  expirationDate?: string;
  /** Scoped to a specific activity vs reusable. */
  activitySpecific?: number;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** Access-list entries governing visibility. */
  accessList?: AccessListEntry[];
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
}

/** Payload for `offers.update`. */
export type UpdateOfferRequest = Partial<CreateOfferRequest> & {
  /** Optional explicit id echo in the body. */
  offerId?: number;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** Open-ended additional fields per tenant config. */
  [key: string]: unknown;
};

/**
 * Offers. To attach an offer to an activity use {@link activityOffers}.
 */
export const offers = (client: HttpClient) => ({
  /** List offers. */
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Offer, "offer">>> => {
    return client.get(`/api/offers${buildQueryString(params)}`);
  },

  /** Fetch a single offer by id. */
  getById: async (id: number | string): Promise<ApiResult<Offer>> => {
    return client.get(`/api/offers/${id}`);
  },

  /** Create a new offer. */
  create: async (request: CreateOfferRequest): Promise<ApiResult<Offer>> => {
    return client.post("/api/offers", request);
  },

  /** Update an existing offer. */
  update: async (
    id: number | string,
    request: UpdateOfferRequest,
  ): Promise<ApiResult<Offer>> => {
    return client.put(`/api/offers/${id}`, request);
  },
});
