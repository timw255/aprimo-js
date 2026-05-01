import { PmPagedLinks } from "./PmPagedCollection";

export interface JournalVoucherItem {
  jvItemId?: number;
  journalVoucherId?: number;
  description?: string;
  quantity?: number;
  price?: number;
  activityId: number;
  expCatId?: number;
  total?: number;
  extendedAttributes?: unknown[];
}

export interface JournalVoucher {
  journalVoucherId: number;
  supplierId: number;
  journalVoucherDate?: string;
  creatorId?: number;
  currencyCode: number;
  fiscalYearId?: number;
  journalVoucherStatus?: number;
  postedDate?: string;
  sendToGlIntegration?: number;
  modifiedUser?: number;
  modifiedDate?: string;
  exchangeRateId?: number;
  multipleActivities?: number;
  glOverridden?: number;
  jvTotal?: number;
  baseTotalJv?: number;
  financeGroupId?: number;
  journalVoucherItems?: JournalVoucherItem[];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  _links?: PmPagedLinks;
}
