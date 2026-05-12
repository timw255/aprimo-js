import { AccessListEntry } from "./AccessListEntry";
import { PmPagedLinks } from "./PmPagedCollection";

/**
 * A PM program — a container that groups several activities together.
 * Promoted from a {@link ProgramProposal}.
 */
export interface Program {
  /** Stable numeric identifier. */
  programId: number;
  /** Display title. */
  title: string;
  /** PM user id of the owner. */
  ownerId?: number;
  /** Long-form description. */
  description?: string;
  /** Start date. */
  startDate?: string;
  /** End date. */
  endDate?: string;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** Classification id assigned to the program. */
  classificationId?: number;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** Access-list entries governing visibility. */
  accessList?: AccessListEntry[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
