import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { User } from "../../../model/productivity/User";
import { UserRight } from "../../../model/productivity/UserRight";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export interface CreateUserRequest {
  loginId: string;
  email: string;
  lastName: string;
  firstName?: string;
  userType?: number;
  currencyCode?: number;
  laborRateCurrencyCode?: number;
  languageId?: number;
  localeId?: number;
  autoSave?: number;
  dateFormat?: number;
  timeFormat?: number;
  numberFormatId?: number;
  timezoneId?: number;
  paperSize?: number;
  htmlEmail?: boolean;
  analyzeAllDomains?: number;
  isPinReset?: number;
  passwordExpires?: number;
  adHocUser?: boolean;
  activeFlag?: number;
  applicationUser?: boolean;
  portalUser?: boolean;
  reviewUser?: boolean;
  isOutOfOffice?: boolean;
  clientLoggingLevel?: number;
  groups?: number[];
  rights?: UserRight[];
}

export type UpdateUserRequest = Partial<CreateUserRequest>;

export interface UserSearchRequest {
  equals?: { fieldName: string; fieldValue: string | number | boolean };
  [key: string]: unknown;
}

export const users = (client: HttpClient) => ({
  getMe: async (): Promise<ApiResult<User>> => {
    return client.get("/api/users/me");
  },

  getById: async (id: number | string): Promise<ApiResult<User>> => {
    return client.get(`/api/users/${id}`);
  },

  getAnnotationUsers: async (): Promise<ApiResult<User[]>> => {
    return client.get("/api/users/annotationUsers");
  },

  create: async (request: CreateUserRequest): Promise<ApiResult<User>> => {
    return client.post("/api/users", request);
  },

  update: async (
    id: number | string,
    request: UpdateUserRequest,
  ): Promise<ApiResult<User>> => {
    return client.put(`/api/users/${id}`, request);
  },

  search: async (
    request: UserSearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<User, "user" | "users">>> => {
    return client.post(`/api/users/search${buildQueryString(params)}`, request);
  },

  resetPin: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/users/${id}/resetpin`, {});
  },

  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/users/${id}`);
  },
});
