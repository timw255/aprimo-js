import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Treatment } from "../../../model/productivity/Treatment";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { PmSearchRequest } from "../../../model/productivity/PmSearchRequest";
import { buildQueryString } from "../../../utils";

/** Payload for `treatments.update`. */
export interface UpdateTreatmentRequest {
  /** Optional explicit id echo in the body. */
  treatmentId?: number;
  /** Display title. */
  title?: string;
  /** Long-form description. */
  description?: string;
  /** Treatment code used for reporting / matching. */
  treatmentCode?: string;
  /** Treatment type id. */
  typeId?: number;
  /** Channel id. */
  channelId?: number;
  /** Active flag. */
  activeFlag?: number;
  /** Scoped to a specific activity vs reusable. */
  activitySpecific?: number;
  /** Currency code id for cost/forecast fields. */
  currencyCode?: number;
  /** Activities this treatment is assigned to. */
  assignedActivityIds?: number[];
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
}

/** Search payload — uses the generic PM search-tree grammar. */
export type TreatmentSearchRequest = PmSearchRequest;

/**
 * Treatments. To attach a treatment to an activity use {@link activityTreatments}.
 */
export const treatments = (client: HttpClient) => ({
  /** Fetch a treatment by id. */
  getById: async (id: number | string): Promise<ApiResult<Treatment>> => {
    return client.get(`/api/treatments/${id}`);
  },

  /** Update an existing treatment. */
  update: async (
    id: number | string,
    request: UpdateTreatmentRequest,
  ): Promise<ApiResult<Treatment>> => {
    return client.put(`/api/treatments/${id}`, request);
  },

  /** Search treatments using the PM search-tree grammar. */
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
