import { PmPagedLinks } from "./PmPagedCollection";

export interface InvoiceItem {
  itemId?: number;
  activityId: number;
  description?: string;
  invoiceId?: number;
  quantity?: number;
  price?: number;
  expCatId?: number;
  committedFundItemId?: number;
  total?: number;
  extendedAttributes?: unknown[];
}

export interface Invoice {
  invoiceId: number;
  supplierId: number;
  commitmentFundId?: number;
  paidDate?: string;
  currencyCode: number;
  totalInvoice?: number;
  baseTotalInvoice?: number;
  dateReceived?: string;
  dateDue?: string;
  modifiedDate?: string;
  invoiceNumber: string;
  modifiedUser?: number;
  reviewedBy?: number;
  financeGroupId?: number;
  reviewedDate?: string;
  pooled?: number;
  status?: number;
  creator?: number;
  invoiceDate?: string;
  fiscalYearId?: number;
  exchangeRateId?: number;
  ownerId?: number;
  invoiceTypeId?: number;
  net?: number;
  invoiceItems?: InvoiceItem[];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  _links?: PmPagedLinks;
}
