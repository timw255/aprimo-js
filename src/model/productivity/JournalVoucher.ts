import { PmPagedLinks } from "./PmPagedCollection";

/**
 * A line item on a {@link JournalVoucher}. Books a portion of the JV
 * against a specific activity and expense category.
 */
export interface JournalVoucherItem {
  /** Stable numeric identifier (server-assigned). */
  jvItemId?: number;
  /** Parent JV id (echoed in the body). */
  journalVoucherId?: number;
  /** Free-form line description. */
  description?: string;
  /** Quantity of the unit. */
  quantity?: number;
  /** Unit price. */
  price?: number;
  /** Activity this line books against. */
  activityId: number;
  /** Expense-category id. */
  expCatId?: number;
  /** Line total (`quantity * price`). */
  total?: number;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
}

/**
 * A journal voucher — manual financial posting outside the regular
 * invoice flow (supplier credits, intercompany reallocations, etc.). JVs
 * move through a submit → reconcile workflow and optionally forward to a
 * GL integration.
 */
export interface JournalVoucher {
  /** Stable numeric identifier. */
  journalVoucherId: number;
  /** Supplier the JV books to. */
  supplierId: number;
  /** JV business date. */
  journalVoucherDate?: string;
  /** PM user id of the creator. */
  creatorId?: number;
  /** Currency code id. */
  currencyCode: number;
  /** Fiscal year id. */
  fiscalYearId?: number;
  /** Workflow state id. */
  journalVoucherStatus?: number;
  /** Date the JV was posted. */
  postedDate?: string;
  /** Whether to forward to GL integration on submit. */
  sendToGlIntegration?: number;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** Exchange-rate id pinning the JV to a specific rate. */
  exchangeRateId?: number;
  /** Multi-activity flag. */
  multipleActivities?: number;
  /** GL-override flag. */
  glOverridden?: number;
  /** Computed JV total in the JV currency. */
  jvTotal?: number;
  /** Computed JV total in base currency. */
  baseTotalJv?: number;
  /** Finance-group id. */
  financeGroupId?: number;
  /** Line items. */
  journalVoucherItems?: JournalVoucherItem[];
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
