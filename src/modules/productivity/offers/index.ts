import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { AccessListEntry } from "../../../model/productivity/AccessListEntry";
import { Offer } from "../../../model/productivity/Offer";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export interface CreateOfferRequest {
  title: string;
  offerCode?: string;
  statusId?: number;
  description?: string;
  ownerId?: number;
  beginDate?: string;
  expirationDate?: string;
  activitySpecific?: number;
  modifiedUser?: number;
  accessList?: AccessListEntry[];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
}

export type UpdateOfferRequest = Partial<CreateOfferRequest> & {
  offerId?: number;
  modifiedUser?: number;
  modifiedDate?: string;
  [key: string]: unknown;
};

export const offers = (client: HttpClient) => ({
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Offer, "offer">>> => {
    return client.get(`/api/offers${buildQueryString(params)}`);
  },

  getById: async (id: number | string): Promise<ApiResult<Offer>> => {
    return client.get(`/api/offers/${id}`);
  },

  create: async (request: CreateOfferRequest): Promise<ApiResult<Offer>> => {
    return client.post("/api/offers", request);
  },

  update: async (
    id: number | string,
    request: UpdateOfferRequest,
  ): Promise<ApiResult<Offer>> => {
    return client.put(`/api/offers/${id}`, request);
  },
});
