import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Supplier, SupplierFinanceGroup } from "../../../model/productivity/Supplier";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { PmSearchRequest } from "../../../model/productivity/PmSearchRequest";
import { buildQueryString } from "../../../utils";

/** Payload for `suppliers.create`. */
export interface CreateSupplierRequest {
  /** Display name. */
  name: string;
  /** Mark the supplier as preferred. */
  preferred?: number;
  /** Active flag. */
  activeFlag?: number;
  /** Supplier type id. */
  supplierTypeId?: number;
  /** Notification preference id. */
  notificationTypeId?: number;
  /** External supplier number (for ERP/accounting integration). */
  supplierNumber?: string;
  /** Long-form description. */
  description?: string;
  /** Contact phone number. */
  phone?: string;
  /** Finance-group user ids that approve / interact with this supplier. */
  financeGroups?: SupplierFinanceGroup[];
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
}

/** Payload for `suppliers.update`. */
export type UpdateSupplierRequest = Partial<CreateSupplierRequest>;

/** Search payload — uses the generic PM search-tree grammar. */
export type SupplierSearchRequest = PmSearchRequest;

/**
 * Vendors / suppliers referenced by invoices, commitments, and other
 * financial records. Search supported alongside standard CRUD.
 */
export const suppliers = (client: HttpClient) => ({
  /** List suppliers. */
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Supplier, "supplier">>> => {
    return client.get(`/api/suppliers${buildQueryString(params)}`);
  },

  /** Fetch a single supplier by id. */
  getById: async (id: number | string): Promise<ApiResult<Supplier>> => {
    return client.get(`/api/suppliers/${id}`);
  },

  /** Create a new supplier. */
  create: async (request: CreateSupplierRequest): Promise<ApiResult<Supplier>> => {
    return client.post("/api/suppliers/", request);
  },

  /** Update an existing supplier. */
  update: async (
    id: number | string,
    request: UpdateSupplierRequest,
  ): Promise<ApiResult<Supplier>> => {
    return client.put(`/api/suppliers/${id}`, request);
  },

  /**
   * Search suppliers using the PM search-tree grammar.
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.suppliers.search({
   *   equals: { fieldName: "preferred", fieldValue: 1 },
   * });
   * ```
   */
  search: async (
    request: SupplierSearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Supplier, "supplier">>> => {
    return client.post(
      `/api/suppliers/search${buildQueryString(params)}`,
      request,
    );
  },

  /** Permanently delete a supplier. */
  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/suppliers/${id}`);
  },
});
