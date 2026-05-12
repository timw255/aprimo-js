import { AccessListEntry } from "./AccessListEntry";
import { PmPagedLinks } from "./PmPagedCollection";

/**
 * A single row in a proposal's cost/effort forecast — planned spend or
 * effort for a service in a given fiscal period.
 */
export interface ActivityProposalForecast {
  /** Stable numeric identifier. */
  proposalForecastId: number;
  /** Service id this forecast row applies to. */
  serviceId?: number;
  /** Parent proposal id. */
  proposalId: number;
  /** Free-form description. */
  description?: string;
  /** Forecasted unit count. */
  units?: number;
  /** Forecasted cost in the proposal's currency. */
  cost?: number;
  /** Expense category id. */
  expCatId?: number;
  /** Fiscal year id. */
  fiscalYearId?: number;
  /** Fiscal period id within the year. */
  fiscalPeriodId?: number;
  /** Exchange-rate id pinning the cost to a specific rate. */
  exchangeRateId?: number;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
}

/** Wrapper returned by `activityProposals.getForecasts`. */
export interface ActivityProposalForecasts {
  /** Parent proposal id. */
  activityProposalId: number;
  /** Forecast rows for the proposal. */
  forecasts: ActivityProposalForecast[];
}

/**
 * An activity proposal — an activity-shaped planning document used to scope
 * cost, effort, and timeline before committing to a real `Activity`.
 * Proposals can be flagged `isTemplate` and reused as the basis for new
 * proposals.
 */
export interface ActivityProposal {
  /** Stable numeric identifier. */
  proposalId: number;
  /** Display title. */
  title: string;
  /** Proposal workflow state id. */
  proposalState?: number;
  /** Approval-workflow type id. */
  approvalType?: number;
  /** Activity type the proposal targets. */
  activityTypeId?: number;
  /** PM user id of the owner. */
  ownerId?: number;
  /** PM user id of the administrator. */
  administratorId?: number;
  /** Planned start date. */
  beginDate?: string;
  /** Planned end date. */
  endDate?: string;
  /** Anchor date used for relative scheduling. */
  anchorDate?: string;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** Classification id assigned to the proposal. */
  classificationId?: number;
  /** Currency code id. */
  currencyCode?: number;
  /** Time-zone id. */
  timeZone?: number;
  /** Non-zero values mark the proposal as a reusable template. */
  isTemplate?: number;
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
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}

/**
 * Minimal projection of a proposal flagged as a reusable template, as
 * returned by `activityProposals.getTemplates`.
 */
export interface ActivityProposalTemplate {
  /** Stable numeric identifier. */
  proposalId: number;
  /** Display title. */
  title: string;
  /** Always non-zero for templates. */
  isTemplate: number;
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
