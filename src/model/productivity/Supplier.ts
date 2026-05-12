import { PmPagedLinks } from "./PmPagedCollection";

/** Finance-group member reference on a {@link Supplier}. */
export interface SupplierFinanceGroup {
  /** PM user id of the finance-group member. */
  userId: number;
}

/**
 * A vendor / supplier referenced by invoices, commitments, and other
 * financial records.
 */
export interface Supplier {
  /** Stable numeric identifier. */
  supplierId: number;
  /** Display name. */
  name: string;
  /** Preferred-supplier flag. */
  preferred: number;
  /** Active flag. */
  activeFlag: number;
  /** Supplier type id. */
  supplierTypeId?: number;
  /** Notification preference id. */
  notificationTypeId?: number;
  /** External supplier number (ERP/accounting integration). */
  supplierNumber?: string;
  /** Long-form description. */
  description?: string;
  /** Contact phone number. */
  phone?: string;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** Finance-group members that approve / interact with this supplier. */
  financeGroups?: SupplierFinanceGroup[];
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
