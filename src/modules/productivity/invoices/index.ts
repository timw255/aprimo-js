import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Invoice, InvoiceItem } from "../../../model/productivity/Invoice";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export interface CreateInvoiceRequest {
  supplierId: number;
  currencyCode: number;
  dateReceived?: string;
  dateDue?: string;
  invoiceNumber: string;
  financeGroupId?: number;
  invoiceTypeId?: number;
  pooled?: number;
  net?: number;
  status: number;
  creator: number;
  invoiceDate?: string;
  fiscalYearId?: number;
  exchangeRateId?: number;
  ownerId: number;
  invoiceItems?: InvoiceItem[];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
}

export type UpdateInvoiceRequest = Partial<CreateInvoiceRequest> & {
  totalInvoice?: number;
  baseTotalInvoice?: number;
  modifiedDate?: string;
  modifiedUser?: number;
  reviewedBy?: number;
  reviewedDate?: string;
};

export interface InvoiceSearchRequest {
  equals?: { fieldname: string; fieldvalue: string | number | boolean };
  [key: string]: unknown;
}

export const invoices = (client: HttpClient) => ({
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Invoice, "invoices" | "invoice">>> => {
    return client.get(`/api/invoices${buildQueryString(params)}`);
  },

  getById: async (id: number | string): Promise<ApiResult<Invoice>> => {
    return client.get(`/api/invoices/${id}`);
  },

  create: async (request: CreateInvoiceRequest): Promise<ApiResult<Invoice>> => {
    return client.post("/api/invoices/", request);
  },

  update: async (
    id: number | string,
    request: UpdateInvoiceRequest,
  ): Promise<ApiResult<Invoice>> => {
    return client.put(`/api/invoices/${id}`, request);
  },

  search: async (
    request: InvoiceSearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Invoice, "invoices" | "invoice">>> => {
    return client.post(
      `/api/invoices/search${buildQueryString(params)}`,
      request,
    );
  },

  submit: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/invoices/${id}/submit`, {});
  },

  retrieve: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/invoices/${id}/retrieve`, {});
  },

  approve: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/invoices/${id}/approve`, {});
  },

  sent: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/invoices/${id}/sent`, {});
  },

  cancel: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/invoices/${id}/cancel`, {});
  },

  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/invoices/${id}`);
  },
});
