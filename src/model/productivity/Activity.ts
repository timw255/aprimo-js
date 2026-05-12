import { PmPagedLinks } from "./PmPagedCollection";

/** A PM activity. */
export interface Activity {
  /** Stable numeric identifier. */
  activityId: number;
  /** Display name. */
  name: string;
  /** Long-form description. */
  description?: string;
  /** Activity type id. */
  activityTypeId?: number;
  /** Workflow state id. */
  activityStateId?: number;
  /** PM user id of the owner. */
  ownerId?: number;
  /** PM user id of the administrator. */
  administratorId?: number;
  /** Start date. */
  beginDate?: string;
  /** End date. */
  endDate?: string;
  /** Separate end date used for visualization. */
  visualEndDate?: string;
  /** Currency code id. */
  currencyCode?: number;
  /** Security context (SCS) id, if scoped. */
  scsId?: number;
  /** Time zone id. */
  timeZoneId?: number;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
