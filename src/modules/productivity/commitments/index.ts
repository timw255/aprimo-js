import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import {
  Commitment,
  CommitmentItem,
} from "../../../model/productivity/Commitment";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { PmSearchRequest } from "../../../model/productivity/PmSearchRequest";
import { buildQueryString } from "../../../utils";

export interface CreateCommitmentRequest {
  supplierId: number;
  purchaseOrderNumber?: string;
  closed?: number;
  currencyCode: number;
  enteredValue?: number;
  ownerId: number;
  commitmentStatus?: number;
  financeGroupId?: number;
  totalPendingInvoice?: number;
  baseTotalPendingInvoice?: number;
  totalPaidInvoice?: number;
  baseTotalPaidInvoice?: number;
  totalPendingAndPaidInvoice?: number;
  totalAmount?: number;
  baseTotalAmount?: number;
  totalOutstanding?: number;
  baseTotalOutstanding?: number;
  proposedTotalAmount?: number;
  proposedBaseTotalAmount?: number;
  commitmentItems: [CommitmentItem, ...CommitmentItem[]];
  proposedCommitmentItems?: CommitmentItem[];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
}

export type UpdateCommitmentRequest = Partial<CreateCommitmentRequest>;

export type CommitmentSearchRequest = PmSearchRequest;

export const commitments = (client: HttpClient) => ({
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Commitment, "commitment">>> => {
    return client.get(`/api/commitments${buildQueryString(params)}`);
  },

  getById: async (id: number | string): Promise<ApiResult<Commitment>> => {
    return client.get(`/api/commitments/${id}`);
  },

  create: async (
    request: CreateCommitmentRequest,
  ): Promise<ApiResult<Commitment>> => {
    return client.post("/api/commitments/", request);
  },

  update: async (
    id: number | string,
    request: UpdateCommitmentRequest,
  ): Promise<ApiResult<Commitment>> => {
    return client.put(`/api/commitments/${id}`, request);
  },

  search: async (
    request: CommitmentSearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Commitment, "commitment">>> => {
    return client.post(
      `/api/commitments/search${buildQueryString(params)}`,
      request,
    );
  },

  cancel: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/commitments/${id}/cancel`, {});
  },

  retrieve: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/commitments/${id}/retrieve`, {});
  },

  submit: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/commitments/${id}/submit`, {});
  },

  approve: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/commitments/${id}/approve`, {});
  },

  reject: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/commitments/${id}/reject`, {});
  },

  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/commitments/${id}`);
  },
});
