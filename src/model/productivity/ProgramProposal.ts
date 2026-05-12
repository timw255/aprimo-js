import { AccessListEntry } from "./AccessListEntry";
import { PmPagedLinks } from "./PmPagedCollection";

/**
 * A program proposal — a program-shaped planning document used to scope
 * cost, effort, and timeline before committing to a real {@link Program}.
 */
export interface ProgramProposal {
  /** Stable numeric identifier. */
  proposalId: number;
  /** Display title. */
  title: string;
  /** Classification id assigned to the proposal. */
  classificationId?: number;
  /** Proposal workflow state id. */
  proposalState?: number;
  /** Program type id. */
  programTypeId?: number;
  /** PM user id of the owner. */
  ownerId?: number;
  /** Planned start date. */
  beginDate?: string;
  /** Planned end date. */
  endDate?: string;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** Currency code id. */
  currencyCode?: number;
  /** Planned invoice total. */
  invoiceTotal?: number;
  /** Planned material cost. */
  materialTotal?: number;
  /** Planned labor cost. */
  laborTotal?: number;
  /** Planned travel-and-entertainment cost. */
  tAndETotal?: number;
  /** Aggregate planned cost. */
  totalCost?: number;
  /** Approval-workflow type id. */
  approvalType?: number;
  /** Proposal type id (distinguishes proposal vs template). */
  proposalType?: number;
  /** Access-list entries governing visibility. */
  accessList?: AccessListEntry[];
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
