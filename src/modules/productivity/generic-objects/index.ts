import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import {
  GenericObject,
  GenericObjectType,
} from "../../../model/productivity/GenericObject";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { PmSearchRequest } from "../../../model/productivity/PmSearchRequest";
import { buildQueryString } from "../../../utils";

/** Payload for `genericObjects.create`. */
export interface CreateGenericObjectRequest {
  /** Display name. */
  name: string;
  /** Long-form description. */
  description?: string;
  /** Id of the PM object this generic object relates to. */
  relatedObjectId: number;
  /** Status id (typically active/inactive). */
  status?: number;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
}

/** Payload for `genericObjects.update`. */
export interface UpdateGenericObjectRequest {
  /** Optional explicit id echo in the body. */
  id?: number;
  /** Display name. */
  name?: string;
  /** PM user id of the creator. */
  createdBy?: number;
  /** Creation timestamp. */
  createdDate?: string;
  /** PM user id of the last modifier. */
  modifiedBy?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** Related-object id (typically immutable after create). */
  relatedObjectId?: number;
  /** Status. */
  status?: string;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
}

/** Search payload — uses the generic PM search-tree grammar. */
export type GenericObjectSearchRequest = PmSearchRequest;

const path = (type: GenericObjectType) => `/api/generic-object-${type}`;

/**
 * Generic objects — five tenant-configurable object kinds (`alpha`
 * through `echo`) that PM exposes for custom data models that don't fit
 * the built-in shapes. Every method takes a `type` discriminator to
 * route to the right `/api/generic-object-{type}` endpoint.
 */
export const genericObjects = (client: HttpClient) => ({
  /** List generic objects of the given type. */
  get: async (
    type: GenericObjectType,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<GenericObject, string>>> => {
    return client.get(`${path(type)}${buildQueryString(params)}`);
  },

  /** Fetch a single generic object by id. */
  getById: async (
    type: GenericObjectType,
    id: number | string,
  ): Promise<ApiResult<GenericObject>> => {
    return client.get(`${path(type)}/${id}`);
  },

  /** Create a new generic object of the given type. */
  create: async (
    type: GenericObjectType,
    request: CreateGenericObjectRequest,
  ): Promise<ApiResult<GenericObject>> => {
    return client.post(`${path(type)}/`, request);
  },

  /** Update an existing generic object. */
  update: async (
    type: GenericObjectType,
    id: number | string,
    request: UpdateGenericObjectRequest,
  ): Promise<ApiResult<GenericObject>> => {
    return client.put(`${path(type)}/${id}`, request);
  },

  /** Search generic objects of the given type using the PM search-tree grammar. */
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

  /** Permanently delete a generic object. */
  delete: async (
    type: GenericObjectType,
    id: number | string,
  ): Promise<ApiResult<void>> => {
    return client.delete(`${path(type)}/${id}`);
  },
});
