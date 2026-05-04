import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import {
  JournalVoucher,
  JournalVoucherItem,
} from "../../../model/productivity/JournalVoucher";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { PmSearchRequest } from "../../../model/productivity/PmSearchRequest";
import { buildQueryString } from "../../../utils";

export interface CreateJournalVoucherRequest {
  supplierId: number;
  journalVoucherDate?: string;
  creatorId: number;
  currencyCode: number;
  fiscalYearId: number;
  journalVoucherStatus?: number;
  sendToGlIntegration?: number;
  exchangeRateId?: number;
  multipleActivities?: number;
  glOverridden?: number;
  financeGroupId?: number;
  journalVoucherItems: [JournalVoucherItem, ...JournalVoucherItem[]];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
}

export type UpdateJournalVoucherRequest = Partial<CreateJournalVoucherRequest> & {
  modifiedUser?: number;
  modifiedDate?: string;
  jvTotal?: number;
  baseTotalJv?: number;
};

export type JournalVoucherSearchRequest = PmSearchRequest;

export const journalVouchers = (client: HttpClient) => ({
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<JournalVoucher, "journal-voucher">>> => {
    return client.get(`/api/journal-vouchers${buildQueryString(params)}`);
  },

  getById: async (id: number | string): Promise<ApiResult<JournalVoucher>> => {
    return client.get(`/api/journal-vouchers/${id}`);
  },

  create: async (
    request: CreateJournalVoucherRequest,
  ): Promise<ApiResult<JournalVoucher>> => {
    return client.post("/api/journal-vouchers", request);
  },

  update: async (
    id: number | string,
    request: UpdateJournalVoucherRequest,
  ): Promise<ApiResult<JournalVoucher>> => {
    return client.put(`/api/journal-vouchers/${id}`, request);
  },

  search: async (
    request: JournalVoucherSearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<JournalVoucher, "journal-voucher">>> => {
    return client.post(
      `/api/journal-vouchers/search${buildQueryString(params)}`,
      request,
    );
  },

  cancel: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/journal-vouchers/${id}/cancel`, {});
  },

  reconcile: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/journal-vouchers/${id}/reconcile`, {});
  },

  reject: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/journal-vouchers/${id}/reject`, {});
  },

  submit: async (
    id: number | string,
    request?: {
      journalVoucherId?: number;
      postedDate?: string;
      sendToGlIntegration?: boolean;
    },
  ): Promise<ApiResult<void>> => {
    return client.post(`/api/journal-vouchers/${id}/submit`, request ?? {});
  },

  sent: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/journal-vouchers/${id}/sent`, {});
  },

  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/journal-vouchers/${id}`);
  },
});
