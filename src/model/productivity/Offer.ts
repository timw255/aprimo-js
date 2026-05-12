import { AccessListEntry } from "./AccessListEntry";
import { PmPagedLinks } from "./PmPagedCollection";

/** An offer. Attached to activities via {@link ActivityOffer}. */
export interface Offer {
  /** Stable numeric identifier. */
  offerId: number;
  /** Display title. */
  title: string;
  /** Offer code used for reporting / matching. */
  offerCode?: string;
  /** Lifecycle status id. */
  statusId?: number;
  /** Long-form description. */
  description?: string;
  /** PM user id of the owner. */
  ownerId?: number;
  /** Active-window start. */
  beginDate?: string;
  /** Active-window end. */
  expirationDate?: string;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** Scoped to a specific activity vs reusable. */
  activitySpecific?: number;
  /** Access-list entries governing visibility. */
  accessList?: AccessListEntry[];
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
