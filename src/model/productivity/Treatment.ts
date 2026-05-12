import { PmPagedLinks } from "./PmPagedCollection";

/** A treatment. Attached to activities via {@link ActivityTreatment}. */
export interface Treatment {
  /** Stable numeric identifier. */
  treatmentId: number;
  /** Display title. */
  title: string;
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
  /** Scoped to a specific activity vs reusable. */
  activitySpecific?: number;
  /** Currency code id for cost/forecast fields. */
  currencyCode?: number;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** Activities this treatment is assigned to. */
  assignedActivityIds?: number[];
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
