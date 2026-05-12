import { PmPagedLinks } from "./PmPagedCollection";

/** A cell on a PM activity — pairs an audience segment with treatments. */
export interface ActivityCell {
  /** Stable numeric identifier. */
  activityCellId: number;
  /** Display title. */
  title: string;
  /** Long-form description. */
  description?: string;
  /** Owning activity id. */
  activityId: number;
  /** Cell code used for reporting / matching. */
  code?: string;
  /** Marketing source code attached to the cell. */
  sourceCode?: string;
  /** Forecasted audience size. */
  estimatedQuantity?: number;
  /** Observed audience size. */
  actualQuantity?: number;
  /** Observed response count. */
  actualResponse?: number;
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
