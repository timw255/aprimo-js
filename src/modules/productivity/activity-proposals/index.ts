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

/**
 * Payload for `activityProposals.create`. A proposal is an activity-shaped
 * planning document that hasn't been promoted into an actual `Activity` yet.
 */
export interface CreateActivityProposalRequest {
  /** Display title. */
  title: string;
  /** Proposal workflow state id. */
  proposalState?: number;
  /** Approval-workflow type id. */
  approvalType?: number;
  /** Activity type the proposal targets. */
  activityTypeId: number;
  /** PM user id of the owner. */
  ownerId: number;
  /** PM user id of the administrator. */
  administratorId?: number;
  /** Planned start date. */
  beginDate: string;
  /** Planned end date. */
  endDate: string;
  /** Anchor date used for relative scheduling. */
  anchorDate?: string;
  /** Classification id assigned to the proposal. */
  classificationId?: number;
  /** Currency code id. */
  currencyCode?: number;
  /** Time-zone id. */
  timeZone?: number;
  /** Mark as reusable template (`true`/`1`) vs a one-off proposal. */
  isTemplate?: boolean | number;
  /** Planned invoice total. */
  invoiceTotal?: number;
  /** Planned material cost. */
  materialTotal?: number;
  /** Planned labor cost. */
  laborTotal?: number;
  /** Aggregate planned cost. */
  totalCost?: number;
  /** Exchange-rate id pinning planned costs to a specific rate. */
  exchangeRateId?: number;
  /** Financial-group id this proposal rolls up into. */
  financialGroupId?: number;
  /** Access-list entries governing visibility. */
  accessList?: AccessListEntry[];
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
}

/** Payload for `activityProposals.update`. */
export type UpdateActivityProposalRequest = Partial<CreateActivityProposalRequest>;

/** Search payload — uses the generic PM search-tree grammar. */
export type ActivityProposalSearchRequest = PmSearchRequest;

/**
 * Activity proposals — planning documents shaped like activities. Used to
 * pre-scope cost/effort/timeline before committing to a full `Activity`,
 * and to spawn proposals from reusable templates.
 */
export const activityProposals = (client: HttpClient) => ({
  /** Fetch a single proposal by id. */
  getById: async (
    id: number | string,
  ): Promise<ApiResult<ActivityProposal>> => {
    return client.get(`/api/activity-proposals/${id}`);
  },

  /**
   * Fetch the cost/effort forecast rows associated with a proposal.
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.activityProposals.getForecasts(1234);
   * ```
   */
  getForecasts: async (
    id: number | string,
  ): Promise<ApiResult<ActivityProposalForecasts>> => {
    return client.get(`/api/activity-proposals/${id}/forecasts`);
  },

  /**
   * List proposal templates — proposals flagged `isTemplate` and reusable
   * as the basis for new proposals.
   */
  getTemplates: async (
    params?: PmQueryParams,
  ): Promise<
    ApiResult<PmPagedCollection<ActivityProposalTemplate, "activity-proposal-template" | "activity-proposal-templates">>
  > => {
    return client.get(
      `/api/activity-proposal-templates${buildQueryString(params)}`,
    );
  },

  /** Create a new proposal. */
  create: async (
    request: CreateActivityProposalRequest,
  ): Promise<ApiResult<ActivityProposal>> => {
    return client.post("/api/activity-proposals/", request);
  },

  /** Update an existing proposal. */
  update: async (
    id: number | string,
    request: UpdateActivityProposalRequest,
  ): Promise<ApiResult<ActivityProposal>> => {
    return client.put(`/api/activity-proposals/${id}`, request);
  },

  /**
   * Search proposals using the PM search-tree grammar.
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.activityProposals.search({
   *   equals: { fieldName: "proposalState", fieldValue: 1 },
   * });
   * ```
   */
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
