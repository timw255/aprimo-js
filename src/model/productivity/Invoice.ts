import { PmPagedLinks } from "./PmPagedCollection";

/**
 * A line item on a supplier {@link Invoice}. Optionally references a
 * {@link CommitmentItem} so actual spend reconciles against committed
 * amounts.
 */
export interface InvoiceItem {
  /** Stable numeric identifier (server-assigned). */
  itemId?: number;
  /** Activity this line books against. */
  activityId: number;
  /** Free-form line description. */
  description?: string;
  /** Parent invoice id (echoed in the body). */
  invoiceId?: number;
  /** Quantity of the unit. */
  quantity?: number;
  /** Unit price. */
  price?: number;
  /** Expense-category id. */
  expCatId?: number;
  /** Linked commitment-line-item id, if reconciled. */
  committedFundItemId?: number;
  /** Line total (`quantity * price`). */
  total?: number;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
}

/**
 * A supplier invoice. Line items optionally tie back to commitment items
 * for reconciliation.
 */
export interface Invoice {
  /** Stable numeric identifier. */
  invoiceId: number;
  /** Supplier issuing the invoice. */
  supplierId: number;
  /** Linked commitment id, if reconciled at the header level. */
  commitmentFundId?: number;
  /** Date the invoice was paid. */
  paidDate?: string;
  /** Currency code id. */
  currencyCode: number;
  /** Computed total in the invoice currency. */
  totalInvoice?: number;
  /** Computed total in base currency. */
  baseTotalInvoice?: number;
  /** Date the invoice was received. */
  dateReceived?: string;
  /** Date the invoice is due. */
  dateDue?: string;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** Supplier-provided invoice number. */
  invoiceNumber: string;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** PM user id of the reviewer. */
  reviewedBy?: number;
  /** Finance-group id. */
  financeGroupId?: number;
  /** Review timestamp. */
  reviewedDate?: string;
  /** Pooled flag. */
  pooled?: number;
  /** Workflow state id. */
  status?: number;
  /** PM user id of the creator. */
  creator?: number;
  /** Invoice date. */
  invoiceDate?: string;
  /** Fiscal year id. */
  fiscalYearId?: number;
  /** Exchange-rate id pinning the invoice to a specific rate. */
  exchangeRateId?: number;
  /** PM user id of the owner. */
  ownerId?: number;
  /** Invoice type id. */
  invoiceTypeId?: number;
  /** Net amount (pre-tax). */
  net?: number;
  /** Line items. */
  invoiceItems?: InvoiceItem[];
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
