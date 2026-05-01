import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { AccessListEntry } from "../../../model/productivity/AccessListEntry";
import { Program } from "../../../model/productivity/Program";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

export interface UpdateProgramRequest {
  title?: string;
  ownerId?: number;
  description?: string;
  startDate?: string;
  endDate?: string;
  classificationId?: number;
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  accessList?: AccessListEntry[];
}

export const programs = (client: HttpClient) => ({
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Program, "program" | "programs">>> => {
    return client.get(`/api/programs${buildQueryString(params)}`);
  },

  getById: async (id: number | string): Promise<ApiResult<Program>> => {
    return client.get(`/api/programs/${id}`);
  },

  getByActivityId: async (
    activityId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Program, "program" | "programs">>> => {
    return client.get(
      `/api/activities/${activityId}/programs${buildQueryString(params)}`,
    );
  },

  update: async (
    id: number | string,
    request: UpdateProgramRequest,
  ): Promise<ApiResult<Program>> => {
    return client.put(`/api/programs/${id}`, request);
  },
});
