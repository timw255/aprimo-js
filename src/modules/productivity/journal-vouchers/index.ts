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

/** Payload for `journalVouchers.create`. */
export interface CreateJournalVoucherRequest {
  /** Supplier the JV books to. */
  supplierId: number;
  /** JV business date. */
  journalVoucherDate?: string;
  /** PM user id of the creator. */
  creatorId: number;
  /** Currency code id. */
  currencyCode: number;
  /** Fiscal year id. */
  fiscalYearId: number;
  /** Workflow state id. */
  journalVoucherStatus?: number;
  /** Whether to forward to GL integration on submit. */
  sendToGlIntegration?: number;
  /** Exchange-rate id pinning the JV to a specific rate. */
  exchangeRateId?: number;
  /** Multi-activity flag. */
  multipleActivities?: number;
  /** GL-override flag. */
  glOverridden?: number;
  /** Finance-group id. */
  financeGroupId?: number;
  /** Line items (at least one required). */
  journalVoucherItems: [JournalVoucherItem, ...JournalVoucherItem[]];
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
}

/**
 * Payload for `journalVouchers.update`. Augments the create shape with
 * read-only audit fields that the server populates.
 */
export type UpdateJournalVoucherRequest = Partial<CreateJournalVoucherRequest> & {
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** Computed total in the JV currency. */
  jvTotal?: number;
  /** Computed total in base currency. */
  baseTotalJv?: number;
};

/** Search payload — uses the generic PM search-tree grammar. */
export type JournalVoucherSearchRequest = PmSearchRequest;

/**
 * Journal vouchers — manual financial postings outside the regular
 * invoice flow. Optionally forward to a GL integration on submit.
 */
export const journalVouchers = (client: HttpClient) => ({
  /** List JVs. */
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<JournalVoucher, "journal-voucher">>> => {
    return client.get(`/api/journal-vouchers${buildQueryString(params)}`);
  },

  /** Fetch a single JV by id. */
  getById: async (id: number | string): Promise<ApiResult<JournalVoucher>> => {
    return client.get(`/api/journal-vouchers/${id}`);
  },

  /** Create a new JV. */
  create: async (
    request: CreateJournalVoucherRequest,
  ): Promise<ApiResult<JournalVoucher>> => {
    return client.post("/api/journal-vouchers", request);
  },

  /** Update an existing JV. */
  update: async (
    id: number | string,
    request: UpdateJournalVoucherRequest,
  ): Promise<ApiResult<JournalVoucher>> => {
    return client.put(`/api/journal-vouchers/${id}`, request);
  },

  /** Search JVs using the PM search-tree grammar. */
  search: async (
    request: JournalVoucherSearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<JournalVoucher, "journal-voucher">>> => {
    return client.post(
      `/api/journal-vouchers/search${buildQueryString(params)}`,
      request,
    );
  },

  /** Cancel a JV — reverses any pending workflow state. */
  cancel: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/journal-vouchers/${id}/cancel`, {});
  },

  /** Mark a JV as reconciled (matched to GL). */
  reconcile: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/journal-vouchers/${id}/reconcile`, {});
  },

  /** Reject a submitted JV. */
  reject: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/journal-vouchers/${id}/reject`, {});
  },

  /**
   * Submit a JV into the approval/reconciliation workflow. Optionally
   * forces a posted date and toggles whether to forward to the GL
   * integration on submission.
   */
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

  /** Mark an approved JV as sent (e.g., posted downstream). */
  sent: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/journal-vouchers/${id}/sent`, {});
  },

  /** Permanently delete a JV. */
  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/journal-vouchers/${id}`);
  },
});
