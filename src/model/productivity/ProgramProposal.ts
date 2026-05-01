import { AccessListEntry } from "./AccessListEntry";
import { PmPagedLinks } from "./PmPagedCollection";

export interface ProgramProposal {
  proposalId: number;
  title: string;
  classificationId?: number;
  proposalState?: number;
  programTypeId?: number;
  ownerId?: number;
  beginDate?: string;
  endDate?: string;
  modifiedDate?: string;
  modifiedUser?: number;
  currencyCode?: number;
  invoiceTotal?: number;
  materialTotal?: number;
  laborTotal?: number;
  tAndETotal?: number;
  totalCost?: number;
  approvalType?: number;
  proposalType?: number;
  accessList?: AccessListEntry[];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  _links?: PmPagedLinks;
}
