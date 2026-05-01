import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import {
  GenericObject,
  GenericObjectType,
} from "../../../model/productivity/GenericObject";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export interface CreateGenericObjectRequest {
  name: string;
  description?: string;
  relatedObjectId: number;
  status?: number;
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
}

export interface UpdateGenericObjectRequest {
  id?: number;
  name?: string;
  createdBy?: number;
  createdDate?: string;
  modifiedBy?: number;
  modifiedDate?: string;
  relatedObjectId?: number;
  status?: string;
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
}

export interface GenericObjectSearchRequest {
  equals?: { fieldName: string; fieldValue: string | number | boolean };
  contains?: { fieldName: string; fieldValue: string };
  [key: string]: unknown;
}

const path = (type: GenericObjectType) => `/api/generic-object-${type}`;

export const genericObjects = (client: HttpClient) => ({
  get: async (
    type: GenericObjectType,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<GenericObject, string>>> => {
    return client.get(`${path(type)}${buildQueryString(params)}`);
  },

  getById: async (
    type: GenericObjectType,
    id: number | string,
  ): Promise<ApiResult<GenericObject>> => {
    return client.get(`${path(type)}/${id}`);
  },

  create: async (
    type: GenericObjectType,
    request: CreateGenericObjectRequest,
  ): Promise<ApiResult<GenericObject>> => {
    return client.post(`${path(type)}/`, request);
  },

  update: async (
    type: GenericObjectType,
    id: number | string,
    request: UpdateGenericObjectRequest,
  ): Promise<ApiResult<GenericObject>> => {
    return client.put(`${path(type)}/${id}`, request);
  },

  search: async (
    type: GenericObjectType,
    request: GenericObjectSearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<GenericObject, string>>> => {
    return client.post(
      `${path(type)}/search${buildQueryString(params)}`,
      request,
    );
  },

  delete: async (
    type: GenericObjectType,
    id: number | string,
  ): Promise<ApiResult<void>> => {
    return client.delete(`${path(type)}/${id}`);
  },
});
