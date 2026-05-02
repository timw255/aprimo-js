import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { AccessListEntry } from "../../../model/productivity/AccessListEntry";
import {
  ActivityProposal,
  ActivityProposalForecasts,
  ActivityProposalTemplate,
} from "../../../model/productivity/ActivityProposal";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";
import { PmQueryParams } from "../../../model/productivity/PmQueryParams";
import { PmSearchRequest } from "../../../model/productivity/PmSearchRequest";
import { buildQueryString } from "../../../utils";

export interface CreateActivityProposalRequest {
  title: string;
  proposalState?: number;
  approvalType?: number;
  activityTypeId: number;
  ownerId: number;
  administratorId?: number;
  beginDate: string;
  endDate: string;
  anchorDate?: string;
  classificationId?: number;
  currencyCode?: number;
  timeZone?: number;
  isTemplate?: boolean | number;
  invoiceTotal?: number;
  materialTotal?: number;
  laborTotal?: number;
  totalCost?: number;
  exchangeRateId?: number;
  financialGroupId?: number;
  accessList?: AccessListEntry[];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
}

export type UpdateActivityProposalRequest = Partial<CreateActivityProposalRequest>;

export type ActivityProposalSearchRequest = PmSearchRequest;

export const activityProposals = (client: HttpClient) => ({
  getById: async (
    id: number | string,
  ): Promise<ApiResult<ActivityProposal>> => {
    return client.get(`/api/activity-proposals/${id}`);
  },

  getForecasts: async (
    id: number | string,
  ): Promise<ApiResult<ActivityProposalForecasts>> => {
    return client.get(`/api/activity-proposals/${id}/forecasts`);
  },

  getTemplates: async (
    params?: PmQueryParams,
  ): Promise<
    ApiResult<PmPagedCollection<ActivityProposalTemplate, "activity-proposal-template" | "activity-proposal-templates">>
  > => {
    return client.get(
      `/api/activity-proposal-templates${buildQueryString(params)}`,
    );
  },

  create: async (
    request: CreateActivityProposalRequest,
  ): Promise<ApiResult<ActivityProposal>> => {
    return client.post("/api/activity-proposals/", request);
  },

  update: async (
    id: number | string,
    request: UpdateActivityProposalRequest,
  ): Promise<ApiResult<ActivityProposal>> => {
    return client.put(`/api/activity-proposals/${id}`, request);
  },

  search: async (
    request: ActivityProposalSearchRequest,
    params?: PmQueryParams,
  ): Promise<
    ApiResult<PmPagedCollection<ActivityProposal, "activity-proposal" | "activity-proposals">>
  > => {
    return client.post(
      `/api/activity-proposals/search${buildQueryString(params)}`,
      request,
    );
  },
});
