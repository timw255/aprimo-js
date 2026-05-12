import { AccessListEntry } from "./AccessListEntry";
import { PmPagedLinks } from "./PmPagedCollection";

/**
 * Offer snapshot as returned inside `ActivityOffer._embedded.offer`.
 * Fields are optional because the API may include only a subset.
 */
export interface EmbeddedOffer {
  /** Offer title. */
  title?: string;
  /** Offer code. */
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
  /** Whether the offer is scoped to a specific activity. */
  activitySpecific?: number;
  /** Access-list entries governing visibility. */
  accessList?: AccessListEntry[];
}

/** The join between an `Activity` and an `Offer`. */
export interface ActivityOffer {
  /** Stable numeric identifier for the activity-offer link. */
  activityOfferId: number;
  /** Linked offer id. */
  offerId: number;
  /** Linked activity id. */
  activityId: number;
  /** Expected revenue per offer (in the activity's currency). */
  revenuePerOffer?: number;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** Embedded snapshot of the linked offer. */
  _embedded?: { offer?: EmbeddedOffer | EmbeddedOffer[] };
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
