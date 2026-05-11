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
import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";

export interface CreateCheckRequest {
  name: string;
  actionTypeId: string;
  checkCategoryId: string;
}

export type UpdateCheckRequest = Partial<CreateCheckRequest>;

export interface CreateCheckResultRequest {
  checkId: string;
  outcome?: CheckOutcome;
  description?: string;
}

export interface UpdateCheckResultRequest {
  outcome?: CheckOutcome;
  description?: string;
}

export interface CreateCheckFindingRequest {
  occurrence: number;
  finding: string;
  outcome: CheckOutcome;
  explanation?: string;
  recommendation?: string;
}

export type UpdateCheckFindingRequest = Partial<CreateCheckFindingRequest>;

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

  /** Fetch a single finding by occurrence id. */
  getFindingById: async (
    fileVersionId: string,
    checkResultId: string,
    occurrenceId: string,
  ): Promise<ApiResult<CheckFinding>> => {
    return client.get(
      `/api/core/fileversion/${fileVersionId}/checkresult/${checkResultId}/findings/${occurrenceId}`,
    );
  },

  /**
   * Add a finding to a check result.
   *
   * @example
   * ```ts
   * await aprimo.checks.createFinding(fileVersionId, checkResultId, {
   *   occurrence: 1, finding: "Color profile drift", outcome: "Fail",
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

  /** Update a finding by occurrence id. */
  updateFinding: async (
    fileVersionId: string,
    checkResultId: string,
    occurrenceId: string,
    request: UpdateCheckFindingRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(
      `/api/core/fileversion/${fileVersionId}/checkresult/${checkResultId}/findings/${occurrenceId}`,
      request,
    );
  },

  /** Delete a finding by occurrence id. */
  deleteFinding: async (
    fileVersionId: string,
    checkResultId: string,
    occurrenceId: string,
  ): Promise<ApiResult<void>> => {
    return client.delete(
      `/api/core/fileversion/${fileVersionId}/checkresult/${checkResultId}/findings/${occurrenceId}`,
    );
  },
});
