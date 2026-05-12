import { PmPagedLinks } from "./PmPagedCollection";

/**
 * A line item on a {@link Commitment}. Each item ties a portion of the
 * commitment to a specific activity / fiscal period.
 */
export interface CommitmentItem {
  /** Stable numeric identifier (server-assigned). */
  committedItemId?: number;
  /** Activity this line attaches to. */
  activityId: number;
  /** Free-form line description. */
  description?: string;
  /** Exchange-rate id pinning the line to a specific rate. */
  exchangeRateId?: number;
  /** Closed flag. */
  closed?: number;
  /** Fiscal year id this line books into. */
  fiscalYearId?: number;
  /** Fiscal period id within the fiscal year. */
  fiscalPeriodId?: number;
  /** Quantity of the unit being purchased. */
  quantity?: number;
  /** Unit price. */
  price?: number;
  /** Computed total (`quantity * price`, server-validated). */
  total?: number;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
}

/**
 * A purchase commitment with a supplier — line-item amounts tied to
 * activities and fiscal periods, moving through a submit → approve → close
 * workflow.
 */
export interface Commitment {
  /** Stable numeric identifier. */
  committedId: number;
  /** Supplier this commitment is with. */
  supplierId: number;
  /** External PO number, if any. */
  purchaseOrderNumber?: string;
  /** Closed flag. */
  closed?: number;
  /** Commitment currency code id. */
  currencyCode: number;
  /** Amount as entered by the user. */
  enteredValue?: number;
  /** PM user id of the owner. */
  ownerId?: number;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** PM user id of the creator. */
  creatorId?: number;
  /** Creation timestamp. */
  createdDate?: string;
  /** Commitment type id. */
  commitmentTypeId?: number;
  /** Review timestamp. */
  reviewedDate?: string;
  /** PM user id of the reviewer. */
  reviewedBy?: number;
  /** Workflow state id. */
  commitmentStatus?: number;
  /** Finance-group id this commitment rolls up into. */
  financeGroupId?: number;
  /** Pending invoice total. */
  totalPendingInvoice?: number;
  /** Pending invoice total in base currency. */
  baseTotalPendingInvoice?: number;
  /** Paid invoice total. */
  totalPaidInvoice?: number;
  /** Paid invoice total in base currency. */
  baseTotalPaidInvoice?: number;
  /** Sum of paid + pending invoices. */
  totalPendingAndPaidInvoice?: number;
  /** Total commitment amount. */
  totalAmount?: number;
  /** Total commitment amount in base currency. */
  baseTotalAmount?: number;
  /** Outstanding amount (committed minus invoiced). */
  totalOutstanding?: number;
  /** Outstanding amount in base currency. */
  baseTotalOutstanding?: number;
  /** Proposed (pending approval) total. */
  proposedTotalAmount?: number;
  /** Proposed total in base currency. */
  proposedBaseTotalAmount?: number;
  /** Line items. */
  commitmentItems?: CommitmentItem[];
  /** Proposed line items pending approval. */
  proposedCommitmentItems?: CommitmentItem[];
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
