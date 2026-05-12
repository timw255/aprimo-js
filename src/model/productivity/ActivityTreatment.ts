import { PmPagedLinks } from "./PmPagedCollection";

/**
 * Snapshot of a treatment as returned inside `ActivityTreatment._embedded.treatment`.
 * Fields are optional because the API may include only a subset.
 */
export interface EmbeddedTreatment {
  /** Stable treatment id. */
  treatmentId: number;
  /** Display title. */
  title?: string;
  /** Long-form description. */
  description?: string;
  /** Treatment code used for reporting / matching. */
  treatmentCode?: string;
  /** Treatment type id. */
  typeId?: number;
  /** Channel id. */
  channelId?: number;
  /** Active flag. */
  activeFlag?: number;
  /** Scoped to a single activity vs reusable. */
  activitySpecific?: number;
  /** Currency code id for cost/forecast fields. */
  currencyCode?: number;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** Other activities this treatment is assigned to. */
  assignedActivityIds?: number[];
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
}

/** The join between an `Activity` and a `Treatment`. */
export interface ActivityTreatment {
  /** Stable numeric identifier for the activity-treatment link. */
  activityTreatmentId: number;
  /** Linked treatment id. */
  treatmentId: number;
  /** Linked activity id. */
  activityId: number;
  /** Currency code id. */
  currencyCode?: number;
  /** Embedded snapshot of the linked treatment. */
  _embedded?: { treatment?: EmbeddedTreatment | EmbeddedTreatment[] };
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
