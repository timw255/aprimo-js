import { ActionType } from "../../model/ActionType";
import { ActionTypeCollection } from "../../model/ActionTypeCollection";
import { ApiResult } from "../../client";
import { Check } from "../../model/Check";
import { CheckCategory } from "../../model/CheckCategory";
import { CheckCategoryCollection } from "../../model/CheckCategoryCollection";
import { CheckCollection } from "../../model/CheckCollection";
import { CheckFinding } from "../../model/CheckFinding";
import { CheckFindingCollection } from "../../model/CheckFindingCollection";
import { CheckOutcome, CheckResult } from "../../model/CheckResult";
import { CheckResultCollection } from "../../model/CheckResultCollection";
import { HttpClient } from "../../http";
import { Label } from "../../model/Label";
import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";

export interface CreateCheckRequest {
  name: string;
  actionTypeId: string;
  checkCategoryId: string;
  /** Whether the check is active. Defaults to `true` server-side. */
  isActive?: boolean;
  /**
   * Whether the check can be deleted afterwards. Defaults to `true` server-side.
   * A check created with `false` cannot be removed by `delete`, and the API also
   * refuses to record check results against it.
   */
  isDeletable?: boolean;
  /** Multi-language labels for this check. */
  labels?: Label[];
}

/**
 * `update` issues a PUT that replaces the check, so the request carries the same
 * shape as `create` minus `isDeletable`, which is fixed at creation.
 */
export type UpdateCheckRequest = Omit<CreateCheckRequest, "isDeletable">;

export interface CreateCheckResultRequest {
  checkId: string;
  outcome?: CheckOutcome;
  description?: string;
  /**
   * Findings to record alongside the result. Supplying them here creates the
   * result and its findings in a single call, rather than following up with
   * `createFinding` for each one.
   */
  findings?: CreateCheckResultFindingData[];
}

/** A finding supplied inline on {@link CreateCheckResultRequest.findings}. */
export interface CreateCheckResultFindingData {
  occurrence: number;
  finding: string;
  outcome: CheckOutcome;
  explanation?: string;
  recommendation?: string;
  /** Serialized JSON document — see {@link CreateCheckFindingRequest.additionalData}. */
  additionalData?: string;
}

export interface UpdateCheckResultRequest {
  outcome?: CheckOutcome;
  description?: string;
}

export interface CreateCheckFindingRequest {
  /** Occurrence number of the finding within the check result. Must be greater than 0. */
  occurrence: number;
  finding: string;
  outcome: CheckOutcome;
  explanation?: string;
  recommendation?: string;
  /**
   * Extra data to store on the finding, as a serialized JSON document
   * (e.g. `JSON.stringify({ ... })`). The API rejects a value that isn't valid
   * JSON — including an empty string — with an HTTP 500. Omit it rather than
   * passing `""`.
   */
  additionalData?: string;
}

/**
 * `updateFinding` issues a PUT that replaces the finding, so `finding` and
 * `outcome` must be resent. `occurrence` is not part of the body — it identifies
 * the finding in the URL.
 */
export type UpdateCheckFindingRequest = Omit<
  CreateCheckFindingRequest,
  "occurrence"
>;

export const checks = (client: HttpClient) => ({
  /**
   * List configured checks.
   *
   * @example
   * ```ts
   * const res = await aprimo.checks.get();
   * ```
   */
  get: async (
    params?: QueryParams,
  ): Promise<ApiResult<CheckCollection>> => {
    const headers = buildHeaders(params);
    return client.get("/api/core/checks", headers);
  },

  /**
   * Fetch a single check by id.
   *
   * @example
   * ```ts
   * const res = await aprimo.checks.getById(checkId);
   * ```
   */
  getById: async (id: string): Promise<ApiResult<Check>> => {
    return client.get(`/api/core/checks/${id}`);
  },

  /**
   * Create a new check.
   *
   * @example
   * ```ts
   * const res = await aprimo.checks.create({
   *   name: "Brand compliance",
   *   actionTypeId: "<action-type-id>",
   *   checkCategoryId: "<category-id>",
   * });
   * ```
   */
  create: async (request: CreateCheckRequest): Promise<ApiResult<Check>> => {
    return client.post("/api/core/checks", request);
  },

  /**
   * Update an existing check.
   *
   * @example
   * ```ts
   * await aprimo.checks.update(id, { name: "Renamed" });
   * ```
   */
  update: async (
    id: string,
    request: UpdateCheckRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/checks/${id}`, request);
  },

  /**
   * Permanently delete a check.
   *
   * Only works for checks created with `isDeletable` left at its default (or
   * set to `true`) — the API refuses to delete a check marked non-deletable.
   *
   * @example
   * ```ts
   * await aprimo.checks.delete(checkId);
   * ```
   */
  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/checks/${id}`);
  },

  /**
   * List the check action types available in the tenant. Use an action type's
   * id as `actionTypeId` when creating a check.
   *
   * @example
   * ```ts
   * const res = await aprimo.checks.getActionTypes();
   * const actionTypeId = res.data?.items?.[0]?.id;
   * ```
   */
  getActionTypes: async (
    params?: QueryParams,
  ): Promise<ApiResult<ActionTypeCollection>> => {
    const headers = buildHeaders(params);
    return client.get("/api/core/actiontypes", headers);
  },

  /** Fetch a single check action type by id. */
  getActionTypeById: async (id: string): Promise<ApiResult<ActionType>> => {
    return client.get(`/api/core/actiontype/${id}`);
  },

  /**
   * List check categories.
   *
   * @example
   * ```ts
   * const res = await aprimo.checks.getCategories();
   * ```
   */
  getCategories: async (
    params?: QueryParams,
  ): Promise<ApiResult<CheckCategoryCollection>> => {
    const headers = buildHeaders(params);
    return client.get("/api/core/checkcategories", headers);
  },

  /**
   * Fetch a single check category by id.
   */
  getCategoryById: async (id: string): Promise<ApiResult<CheckCategory>> => {
    return client.get(`/api/core/checkcategories/${id}`);
  },

  /**
   * List the check results recorded against a file version.
   *
   * @example
   * ```ts
   * const res = await aprimo.checks.getResults(fileVersionId);
   * ```
   */
  getResults: async (
    fileVersionId: string,
    params?: QueryParams,
  ): Promise<ApiResult<CheckResultCollection>> => {
    const headers = buildHeaders(params);
    return client.get(
      `/api/core/fileversion/${fileVersionId}/checkresults`,
      headers,
    );
  },

  /** Fetch a single check result on a file version. */
  getResultById: async (
    fileVersionId: string,
    checkResultId: string,
  ): Promise<ApiResult<CheckResult>> => {
    return client.get(
      `/api/core/fileversion/${fileVersionId}/checkresult/${checkResultId}`,
    );
  },

  /**
   * Record a check result against a file version.
   *
   * @example
   * ```ts
   * await aprimo.checks.createResult(fileVersionId, {
   *   checkId, outcome: "Pass",
   * });
   * ```
   */
  createResult: async (
    fileVersionId: string,
    request: CreateCheckResultRequest,
  ): Promise<ApiResult<CheckResult>> => {
    return client.post(
      `/api/core/fileversion/${fileVersionId}/checkresults`,
      request,
    );
  },

  /** Update a check result on a file version. */
  updateResult: async (
    fileVersionId: string,
    checkResultId: string,
    request: UpdateCheckResultRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(
      `/api/core/fileversion/${fileVersionId}/checkresult/${checkResultId}`,
      request,
    );
  },

  /** Delete a check result from a file version. */
  deleteResult: async (
    fileVersionId: string,
    checkResultId: string,
  ): Promise<ApiResult<void>> => {
    return client.delete(
      `/api/core/fileversion/${fileVersionId}/checkresult/${checkResultId}`,
    );
  },

  /** List the findings logged against a check result. */
  getFindings: async (
    fileVersionId: string,
    checkResultId: string,
    params?: QueryParams,
  ): Promise<ApiResult<CheckFindingCollection>> => {
    const headers = buildHeaders(params);
    return client.get(
      `/api/core/fileversion/${fileVersionId}/checkresult/${checkResultId}/findings`,
      headers,
    );
  },

  /**
   * Fetch a single finding by its occurrence number within the check result.
   *
   * Findings have no id of their own — `occurrence` is the identifier.
   */
  getFindingById: async (
    fileVersionId: string,
    checkResultId: string,
    occurrence: number,
  ): Promise<ApiResult<CheckFinding>> => {
    return client.get(
      `/api/core/fileversion/${fileVersionId}/checkresult/${checkResultId}/findings/${occurrence}`,
    );
  },

  /**
   * Add a finding to a check result.
   *
   * The response carries no id — address the finding afterwards by the
   * `occurrence` you supplied here.
   *
   * @example
   * ```ts
   * await aprimo.checks.createFinding(fileVersionId, checkResultId, {
   *   occurrence: 1, finding: "Color profile drift", outcome: "fail",
   * });
   * ```
   */
  createFinding: async (
    fileVersionId: string,
    checkResultId: string,
    request: CreateCheckFindingRequest,
  ): Promise<ApiResult<CheckFinding>> => {
    return client.post(
      `/api/core/fileversion/${fileVersionId}/checkresult/${checkResultId}/findings`,
      request,
    );
  },

  /**
   * Update a finding by its occurrence number. This is a PUT that replaces the
   * finding, so `finding` and `outcome` must be included.
   *
   * @example
   * ```ts
   * await aprimo.checks.updateFinding(fileVersionId, checkResultId, 1, {
   *   finding: "Color profile drift", outcome: "pass",
   * });
   * ```
   */
  updateFinding: async (
    fileVersionId: string,
    checkResultId: string,
    occurrence: number,
    request: UpdateCheckFindingRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(
      `/api/core/fileversion/${fileVersionId}/checkresult/${checkResultId}/findings/${occurrence}`,
      request,
    );
  },

  /** Delete a finding by its occurrence number. */
  deleteFinding: async (
    fileVersionId: string,
    checkResultId: string,
    occurrence: number,
  ): Promise<ApiResult<void>> => {
    return client.delete(
      `/api/core/fileversion/${fileVersionId}/checkresult/${checkResultId}/findings/${occurrence}`,
    );
  },
});
