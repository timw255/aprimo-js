import { PmPagedLinks } from "./PmPagedCollection";

export interface SupplierFinanceGroup {
  userId: number;
}

export interface Supplier {
  supplierId: number;
  name: string;
  preferred: number;
  activeFlag: number;
  supplierTypeId?: number;
  notificationTypeId?: number;
  supplierNumber?: string;
  description?: string;
  phone?: string;
  modifiedUser?: number;
  modifiedDate?: string;
  financeGroups?: SupplierFinanceGroup[];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  _links?: PmPagedLinks;
}
