import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Invoice, InvoiceItem } from "../../../model/productivity/Invoice";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { PmSearchRequest } from "../../../model/productivity/PmSearchRequest";
import { buildQueryString } from "../../../utils";

/** Payload for `invoices.create`. */
export interface CreateInvoiceRequest {
  /** Supplier issuing the invoice. */
  supplierId: number;
  /** Currency code id. */
  currencyCode: number;
  /** Date the invoice was received. */
  dateReceived?: string;
  /** Date the invoice is due. */
  dateDue?: string;
  /** Supplier-provided invoice number. */
  invoiceNumber: string;
  /** Finance-group id this invoice books to. */
  financeGroupId?: number;
  /** Invoice type id. */
  invoiceTypeId?: number;
  /** Pooled flag. */
  pooled?: number;
  /** Net amount (pre-tax). */
  net?: number;
  /** Workflow state id. */
  status: number;
  /** PM user id of the creator. */
  creator: number;
  /** Invoice date. */
  invoiceDate?: string;
  /** Fiscal year id this invoice books into. */
  fiscalYearId?: number;
  /** Exchange-rate id pinning the invoice to a specific rate. */
  exchangeRateId?: number;
  /** PM user id of the owner. */
  ownerId: number;
  /** Line items. */
  invoiceItems?: InvoiceItem[];
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
}

/**
 * Payload for `invoices.update`. Augments the create shape with read-only
 * audit fields the server populates and may accept on update.
 */
export type UpdateInvoiceRequest = Partial<CreateInvoiceRequest> & {
  /** Computed total in the invoice currency. */
  totalInvoice?: number;
  /** Computed total in base currency. */
  baseTotalInvoice?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** PM user id of the reviewer. */
  reviewedBy?: number;
  /** Review timestamp. */
  reviewedDate?: string;
};

/** Search payload — uses the generic PM search-tree grammar. */
export type InvoiceSearchRequest = PmSearchRequest;

/**
 * Supplier invoices — line-item bills. Line items optionally tie back to
 * commitment items so actual spend reconciles against committed amounts.
 */
export const invoices = (client: HttpClient) => ({
  /** List invoices. */
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Invoice, "invoices">>> => {
    return client.get(`/api/invoices${buildQueryString(params)}`);
  },

  /** Fetch a single invoice by id. */
  getById: async (id: number | string): Promise<ApiResult<Invoice>> => {
    return client.get(`/api/invoices/${id}`);
  },

  /** Create a new invoice. */
  create: async (request: CreateInvoiceRequest): Promise<ApiResult<Invoice>> => {
    return client.post("/api/invoices/", request);
  },

  /** Update an existing invoice. */
  update: async (
    id: number | string,
    request: UpdateInvoiceRequest,
  ): Promise<ApiResult<Invoice>> => {
    return client.put(`/api/invoices/${id}`, request);
  },

  /** Search invoices using the PM search-tree grammar. */
  search: async (
    request: InvoiceSearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Invoice, "invoice">>> => {
    return client.post(
      `/api/invoices/search${buildQueryString(params)}`,
      request,
    );
  },

  /** Submit a draft invoice into the approval workflow. */
  submit: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/invoices/${id}/submit`, {});
  },

  /** Recall a submitted invoice back to draft. */
  retrieve: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/invoices/${id}/retrieve`, {});
  },

  /** Approve a submitted invoice. */
  approve: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/invoices/${id}/approve`, {});
  },

  /** Mark an approved invoice as sent (e.g., handed off to AP). */
  sent: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/invoices/${id}/sent`, {});
  },

  /** Cancel an invoice — reverses any pending workflow approval. */
  cancel: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/invoices/${id}/cancel`, {});
  },

  /** Permanently delete an invoice. */
  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/invoices/${id}`);
  },
});
