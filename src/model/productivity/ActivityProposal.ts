import { AccessListEntry } from "./AccessListEntry";
import { PmPagedLinks } from "./PmPagedCollection";

export interface ActivityProposalForecast {
  proposalForecastId: number;
  serviceId?: number;
  proposalId: number;
  description?: string;
  units?: number;
  cost?: number;
  expCatId?: number;
  fiscalYearId?: number;
  fiscalPeriodId?: number;
  exchangeRateId?: number;
  extendedAttributes?: unknown[];
}

export interface ActivityProposalForecasts {
  activityProposalId: number;
  forecasts: ActivityProposalForecast[];
}

export interface ActivityProposal {
  proposalId: number;
  title: string;
  proposalState?: number;
  approvalType?: number;
  activityTypeId?: number;
  ownerId?: number;
  administratorId?: number;
  beginDate?: string;
  endDate?: string;
  anchorDate?: string;
  modifiedDate?: string;
  modifiedUser?: number;
  classificationId?: number;
  currencyCode?: number;
  timeZone?: number;
  isTemplate?: number;
  invoiceTotal?: number;
  materialTotal?: number;
  laborTotal?: number;
  totalCost?: number;
  exchangeRateId?: number;
  financialGroupId?: number;
  accessList?: AccessListEntry[];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  _links?: PmPagedLinks;
}

export interface ActivityProposalTemplate {
  proposalId: number;
  title: string;
  isTemplate: number;
  _links?: PmPagedLinks;
}
