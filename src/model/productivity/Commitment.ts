import { PmPagedLinks } from "./PmPagedCollection";

export interface CommitmentItem {
  committedItemId?: number;
  activityId: number;
  description?: string;
  exchangeRateId?: number;
  closed?: number;
  fiscalYearId?: number;
  fiscalPeriodId?: number;
  quantity?: number;
  price?: number;
  total?: number;
  extendedAttributes?: unknown[];
}

export interface Commitment {
  committedId: number;
  supplierId: number;
  purchaseOrderNumber?: string;
  closed?: number;
  currencyCode: number;
  enteredValue?: number;
  ownerId?: number;
  modifiedUser?: number;
  modifiedDate?: string;
  creatorId?: number;
  createdDate?: string;
  commitmentTypeId?: number;
  reviewedDate?: string;
  reviewedBy?: number;
  commitmentStatus?: number;
  financeGroupId?: number;
  totalPendingInvoice?: number;
  baseTotalPendingInvoice?: number;
  totalPaidInvoice?: number;
  baseTotalPaidInvoice?: number;
  totalPendingAndPaidInvoice?: number;
  totalAmount?: number;
  baseTotalAmount?: number;
  totalOutstanding?: number;
  baseTotalOutstanding?: number;
  proposedTotalAmount?: number;
  proposedBaseTotalAmount?: number;
  commitmentItems?: CommitmentItem[];
  proposedCommitmentItems?: CommitmentItem[];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  _links?: PmPagedLinks;
}
