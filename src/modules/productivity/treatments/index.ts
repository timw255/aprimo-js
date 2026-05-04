import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Treatment } from "../../../model/productivity/Treatment";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { PmSearchRequest } from "../../../model/productivity/PmSearchRequest";
import { buildQueryString } from "../../../utils";

export interface UpdateTreatmentRequest {
  treatmentId?: number;
  title?: string;
  description?: string;
  treatmentCode?: string;
  typeId?: number;
  channelId?: number;
  activeFlag?: number;
  activitySpecific?: number;
  currencyCode?: number;
  assignedActivityIds?: number[];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
}

export type TreatmentSearchRequest = PmSearchRequest;

export const treatments = (client: HttpClient) => ({
  getById: async (id: number | string): Promise<ApiResult<Treatment>> => {
    return client.get(`/api/treatments/${id}`);
  },

  update: async (
    id: number | string,
    request: UpdateTreatmentRequest,
  ): Promise<ApiResult<Treatment>> => {
    return client.put(`/api/treatments/${id}`, request);
  },

  search: async (
    request: TreatmentSearchRequest,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Treatment, "treatment">>> => {
    return client.post(
      `/api/treatments/search${buildQueryString(params)}`,
      request,
    );
  },
});
