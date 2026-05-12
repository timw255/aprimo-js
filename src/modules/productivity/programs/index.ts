import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { AccessListEntry } from "../../../model/productivity/AccessListEntry";
import { Program } from "../../../model/productivity/Program";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { buildQueryString } from "../../../utils";

/** Payload for `programs.update`. */
export interface UpdateProgramRequest {
  /** Display title. */
  title?: string;
  /** PM user id of the owner. */
  ownerId?: number;
  /** Long-form description. */
  description?: string;
  /** Start date. */
  startDate?: string;
  /** End date. */
  endDate?: string;
  /** Classification id assigned to the program. */
  classificationId?: number;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** Access-list entries governing visibility. */
  accessList?: AccessListEntry[];
}

/**
 * PM programs — containers that group several activities together.
 * Read/update only; creation flows through {@link programProposals}.
 */
export const programs = (client: HttpClient) => ({
  /** List programs. */
  get: async (
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Program, "program">>> => {
    return client.get(`/api/programs${buildQueryString(params)}`);
  },

  /** Fetch a single program by id. */
  getById: async (id: number | string): Promise<ApiResult<Program>> => {
    return client.get(`/api/programs/${id}`);
  },

  /** List the programs that contain a given activity. */
  getByActivityId: async (
    activityId: number | string,
    params?: PmQueryParams,
  ): Promise<ApiResult<PmPagedCollection<Program, "program">>> => {
    return client.get(
      `/api/activities/${activityId}/programs${buildQueryString(params)}`,
    );
  },

  /** Update an existing program. */
  update: async (
    id: number | string,
    request: UpdateProgramRequest,
  ): Promise<ApiResult<Program>> => {
    return client.put(`/api/programs/${id}`, request);
  },
});
