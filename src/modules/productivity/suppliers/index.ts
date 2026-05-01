import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Supplier, SupplierFinanceGroup } from "../../../model/productivity/Supplier";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export interface CreateSupplierRequest {
  name: string;
  preferred?: number;
  activeFlag?: number;
  supplierTypeId?: number;
  notificationTypeId?: number;
  supplierNumber?: string;
  description?: string;
  phone?: string;
  financeGroups?: SupplierFinanceGroup[];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
}

export type UpdateSupplierRequest = Partial<CreateSupplierRequest>;

export interface SupplierSearchRequest {
  equals?: { fieldName: string; fieldValue: string | number | boolean };
  [key: string]: unknown;
}

export const suppliers = (client: HttpClient) => ({
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Supplier, "supplier" | "suppliers">>> => {
    return client.get(`/api/suppliers${buildQueryString(params)}`);
  },

  getById: async (id: number | string): Promise<ApiResult<Supplier>> => {
    return client.get(`/api/suppliers/${id}`);
  },

  create: async (request: CreateSupplierRequest): Promise<ApiResult<Supplier>> => {
    return client.post("/api/suppliers/", request);
  },

  update: async (
    id: number | string,
    request: UpdateSupplierRequest,
  ): Promise<ApiResult<Supplier>> => {
    return client.put(`/api/suppliers/${id}`, request);
  },

  search: async (
    request: SupplierSearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Supplier, "supplier" | "suppliers">>> => {
    return client.post(
      `/api/suppliers/search${buildQueryString(params)}`,
      request,
    );
  },

  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/suppliers/${id}`);
  },
});
