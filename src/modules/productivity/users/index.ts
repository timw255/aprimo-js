import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { User } from "../../../model/productivity/User";
import { UserRight } from "../../../model/productivity/UserRight";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { PmSearchRequest } from "../../../model/productivity/PmSearchRequest";
import { buildQueryString } from "../../../utils";

/** Payload for `users.create`. */
export interface CreateUserRequest {
  /** Login identifier (typically email-shaped). */
  loginId: string;
  /** Email address. */
  email: string;
  /** Last name (required by the PM API). */
  lastName: string;
  /** First name. */
  firstName?: string;
  /** User-type id (application user, portal user, etc.). */
  userType?: number;
  /** Currency code id for the user's default currency. */
  currencyCode?: number;
  /** Currency code id for labor-rate display. */
  laborRateCurrencyCode?: number;
  /** Language id. */
  languageId?: number;
  /** Locale id. */
  localeId?: number;
  /** Auto-save preference (`1` enabled). */
  autoSave?: number;
  /** Date-format id. */
  dateFormat?: number;
  /** Time-format id. */
  timeFormat?: number;
  /** Number-format id. */
  numberFormatId?: number;
  /** Time-zone id. */
  timezoneId?: number;
  /** Default paper-size id for reports/exports. */
  paperSize?: number;
  /** Whether the user receives HTML-format emails. */
  htmlEmail?: boolean;
  /** Cross-domain analyze flag. */
  analyzeAllDomains?: number;
  /** Whether the user is in a forced-PIN-reset state. */
  isPinReset?: number;
  /** Whether the password expires. */
  passwordExpires?: number;
  /** Ad-hoc user flag (non-licensed). */
  adHocUser?: boolean;
  /** Active flag. */
  activeFlag?: number;
  /** Application-user flag. */
  applicationUser?: boolean;
  /** Portal-user flag. */
  portalUser?: boolean;
  /** Review-user flag. */
  reviewUser?: boolean;
  /** Out-of-office flag. */
  isOutOfOffice?: boolean;
  /** Client logging verbosity (`0`–`n`). */
  clientLoggingLevel?: number;
  /** Initial group ids to attach the user to. */
  groups?: number[];
  /** Initial user-rights (function + domain pairs) to grant. */
  rights?: UserRight[];
}

/** Payload for `users.update`. */
export type UpdateUserRequest = Partial<CreateUserRequest>;

/** Search payload — uses the generic PM search-tree grammar. */
export type UserSearchRequest = PmSearchRequest;

/**
 * PM users (employees, contractors, portal/review users). User identity is
 * separate from any DAM-side user; the PM API uses numeric `userId` as the
 * canonical identifier.
 */
export const users = (client: HttpClient) => ({
  /**
   * Return the user record for the calling token.
   *
   * @example
   * ```ts
   * const me = await aprimo.productivity.users.getMe();
   * ```
   */
  getMe: async (): Promise<ApiResult<User>> => {
    return client.get("/api/users/me");
  },

  /** Fetch a user by id. */
  getById: async (id: number | string): Promise<ApiResult<User>> => {
    return client.get(`/api/users/${id}`);
  },

  /**
   * Return users eligible to be `@mentioned` in DAM-/PM-side annotations.
   * Specialized list — narrower than `search`.
   */
  getAnnotationUsers: async (): Promise<ApiResult<User[]>> => {
    return client.get("/api/users/annotationUsers");
  },

  /** Create a new user. */
  create: async (request: CreateUserRequest): Promise<ApiResult<User>> => {
    return client.post("/api/users", request);
  },

  /** Update an existing user. Only include fields you want to change. */
  update: async (
    id: number | string,
    request: UpdateUserRequest,
  ): Promise<ApiResult<User>> => {
    return client.put(`/api/users/${id}`, request);
  },

  /**
   * Search users using the PM search-tree grammar.
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.users.search({
   *   equals: { fieldName: "email", fieldValue: "alice@example.com" },
   * });
   * ```
   */
  search: async (
    request: UserSearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<User, "user">>> => {
    return client.post(`/api/users/search${buildQueryString(params)}`, request);
  },

  /** Force a PIN reset on the user. */
  resetPin: async (id: number | string): Promise<ApiResult<void>> => {
    return client.post(`/api/users/${id}/resetpin`, {});
  },

  /** Permanently delete a user. */
  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/users/${id}`);
  },
});
