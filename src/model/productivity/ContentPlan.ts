import { AccessListEntry } from "./AccessListEntry";
import { PmPagedLinks } from "./PmPagedCollection";

/**
 * A content plan — a calendar-style planning surface that groups
 * activities for coordinated execution. Carries its own access list
 * and a set of per-user capability flags (`canRead`, `canModify`, etc.)
 * computed for the calling token.
 */
export interface ContentPlan {
  /** Stable numeric identifier. */
  planId: number;
  /** Status id (typically active/inactive). */
  statusId?: number;
  /** Display title. */
  title: string;
  /** Long-form description. */
  description?: string;
  /** PM user id of the administrator. */
  administratorId?: number;
  /** Start of the plan window. */
  beginDate?: string;
  /** End of the plan window. */
  endDate?: string;
  /** PM user id of the last modifier. */
  modifiedUserId?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** Collections attached to the plan (open-ended schema). */
  collections?: unknown[];
  /** Access-list entries governing visibility. */
  accessList?: AccessListEntry[];
  /** Whether the calling user can read the plan. */
  canRead?: boolean;
  /** Whether the calling user can modify the plan. */
  canModify?: boolean;
  /** Whether the calling user can create activities under the plan. */
  canCreateActivity?: boolean;
  /** Whether the calling user can modify the plan's activities. */
  canModifyActivity?: boolean;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}

/**
 * Response shape for `contentPlans.getManageActivities` — the activities
 * the calling user can attach to the plan, with a paging-style total.
 */
export interface ContentPlanManageActivities {
  /** Total count of manageable activities. */
  _total: number;
  /** Inline activities array (legacy shape). */
  activities?: unknown[];
  /** HAL-style embedded activities (current shape). */
  _embedded?: { activities?: unknown[] };
  /** HAL paging/self links. */
  _links?: PmPagedLinks;
}
