import { PmPagedLinks } from "./PmPagedCollection";

/**
 * A PM project — an execution container (workflow + tasks + assets) that
 * delivers an activity. Projects own their own workflow, scheduling
 * options, role membership, and asset/attachment links.
 */
export interface Project {
  /** Stable numeric identifier. */
  projectId: number;
  /** Parent activity id, if rolled up under one. */
  activityId?: number;
  /** Display title. */
  title: string;
  /** Long-form description. */
  description?: string;
  /** Start date. */
  beginDate?: string;
  /** End date. */
  endDate?: string;
  /** Workflow definition id this project runs under. */
  workflowId?: number;
  /** Workflow state id. */
  projectStatus?: number;
  /** PM user id of the project manager. */
  projectManager?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** "As late as possible" scheduling flag. */
  enableAlap?: number;
  /** Time-zone id. */
  timeZoneId?: number;
  /** Scaling-mode id controlling how durations stretch when dates change. */
  projectScalingTypeId?: number;
  /** Default location id for digital assets produced by the project. */
  digitalAssetLocation?: number;
  /** Whether the project is a change order. */
  changeOrder?: boolean;
  /** Whether to honor the DAM-side asset access list. */
  useDamAssetAccessList?: number;
  /** Whether to allow tasks to float beyond their planned dates. */
  useFloat?: number;
  /** Timestamp of the latest health-indicator recalculation. */
  healthIndicatorDate?: string;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
