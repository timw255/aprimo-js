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

/** Payload for `commitments.create`. */
export interface CreateCommitmentRequest {
  /** Vendor / supplier the commitment is with. */
  supplierId: number;
  /** External PO number, if there is one. */
  purchaseOrderNumber?: string;
  /** Closed flag. */
  closed?: number;
  /** Commitment currency code id. */
  currencyCode: number;
  /** Amount as entered by the user. */
  enteredValue?: number;
  /** PM user id of the owner. */
  ownerId: number;
  /** Workflow state id. */
  commitmentStatus?: number;
  /** Finance-group id this commitment rolls up into. */
  financeGroupId?: number;
  /** Outstanding invoices yet to be paid. */
  totalPendingInvoice?: number;
  /** As `totalPendingInvoice`, in the tenant's base currency. */
  baseTotalPendingInvoice?: number;
  /** Invoices already paid. */
  totalPaidInvoice?: number;
  /** As `totalPaidInvoice`, in base currency. */
  baseTotalPaidInvoice?: number;
  /** Sum of paid + pending invoiced amounts. */
  totalPendingAndPaidInvoice?: number;
  /** Total commitment amount. */
  totalAmount?: number;
  /** Total commitment amount in base currency. */
  baseTotalAmount?: number;
  /** Remaining outstanding amount. */
  totalOutstanding?: number;
  /** Remaining outstanding amount in base currency. */
  baseTotalOutstanding?: number;
  /** Proposed (pending approval) total. */
  proposedTotalAmount?: number;
  /** Proposed total in base currency. */
  proposedBaseTotalAmount?: number;
  /** Line items (at least one required). */
  commitmentItems: [CommitmentItem, ...CommitmentItem[]];
  /** Proposed line items pending approval. */
  proposedCommitmentItems?: CommitmentItem[];
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
}

/** Payload for `commitments.update`. */
export type UpdateCommitmentRequest = Partial<CreateCommitmentRequest>;

/** Search payload — uses the generic PM search-tree grammar. */
export type CommitmentSearchRequest = PmSearchRequest;

/**
 * Commitments (purchase commitments) with suppliers. A commitment ties a
 * supplier to one or more activities/fiscal periods with line-item amounts.
 */
export const commitments = (client: HttpClient) => ({
  /** List commitments. */
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Commitment, "commitment">>> => {
    return client.get(`/api/commitments${buildQueryString(params)}`);
  },

  /** Fetch a single commitment by id. */
  getById: async (id: number | string): Promise<ApiResult<Commitment>> => {
    return client.get(`/api/commitments/${id}`);
  },

  /** Create a new commitment. */
  create: async (
    request: CreateCommitmentRequest,
  ): Promise<ApiResult<Commitment>> => {
    return client.post("/api/commitments/", request);
  },

  /** Update an existing commitment. */
  update: async (
    id: number | string,
    request: UpdateCommitmentRequest,
  ): Promise<ApiResult<Commitment>> => {
    return client.put(`/api/commitments/${id}`, request);
  },

  /** Search commitments using the PM search-tree grammar. */
  search: async (
    request: CommitmentSearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Commitment, "commitment">>> => {
    return client.post(
      `/api/commitments/search${buildQueryString(params)}`,
      request,
    );
  },

  /** Cancel a commitment — reverses any pending workflow approval. */
  cancel: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/commitments/${id}/cancel`, {});
  },

  /** Recall a submitted commitment back to draft. */
  retrieve: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/commitments/${id}/retrieve`, {});
  },

  /** Submit a draft commitment into the approval workflow. */
  submit: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/commitments/${id}/submit`, {});
  },

  /** Approve a submitted commitment. */
  approve: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/commitments/${id}/approve`, {});
  },

  /** Reject a submitted commitment. */
  reject: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/commitments/${id}/reject`, {});
  },

  /** Permanently delete a commitment. */
  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/commitments/${id}`);
  },
});
