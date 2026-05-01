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
  get: async (
    params?: QueryParams,
  ): Promise<ApiResult<CheckCollection>> => {
    const headers = buildHeaders(params);
    return client.get("/api/core/checks", headers);
  },

  getById: async (id: string): Promise<ApiResult<Check>> => {
    return client.get(`/api/core/checks/${id}`);
  },

  create: async (request: CreateCheckRequest): Promise<ApiResult<Check>> => {
    return client.post("/api/core/checks", request);
  },

  update: async (
    id: string,
    request: UpdateCheckRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/checks/${id}`, request);
  },

  getCategories: async (
    params?: QueryParams,
  ): Promise<ApiResult<CheckCategoryCollection>> => {
    const headers = buildHeaders(params);
    return client.get("/api/core/checkcategories", headers);
  },

  getCategoryById: async (id: string): Promise<ApiResult<CheckCategory>> => {
    return client.get(`/api/core/checkcategories/${id}`);
  },

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

  getResultById: async (
    fileVersionId: string,
    checkResultId: string,
  ): Promise<ApiResult<CheckResult>> => {
    return client.get(
      `/api/core/fileversion/${fileVersionId}/checkresult/${checkResultId}`,
    );
  },

  createResult: async (
    fileVersionId: string,
    request: CreateCheckResultRequest,
  ): Promise<ApiResult<CheckResult>> => {
    return client.post(
      `/api/core/fileversion/${fileVersionId}/checkresults`,
      request,
    );
  },

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

  deleteResult: async (
    fileVersionId: string,
    checkResultId: string,
  ): Promise<ApiResult<void>> => {
    return client.delete(
      `/api/core/fileversion/${fileVersionId}/checkresult/${checkResultId}`,
    );
  },

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

  getFindingById: async (
    fileVersionId: string,
    checkResultId: string,
    occurrenceId: string,
  ): Promise<ApiResult<CheckFinding>> => {
    return client.get(
      `/api/core/fileversion/${fileVersionId}/checkresult/${checkResultId}/findings/${occurrenceId}`,
    );
  },

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
