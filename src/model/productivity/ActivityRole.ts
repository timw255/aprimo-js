import { PmPagedLinks } from "./PmPagedCollection";

/**
 * A user or user-token reference used in activity-role membership payloads.
 */
export interface ActivityRoleMember {
  /** PM user id (or user-token id) to attach to the role. */
  id: number;
}

/**
 * Per-activity binding of a tenant `UserRole` to one or more users. Roles
 * control who can act on the activity in what capacity.
 */
export interface ActivityRole {
  /** Stable numeric identifier (server-assigned). */
  activityRoleId?: number;
  /** Underlying tenant user-role id this binding wraps. */
  userRoleId: number;
  /** Activity the role is attached to. */
  activityId?: number;
  /** Direct user members. */
  users?: ActivityRoleMember[];
  /** User-token members (alias references). */
  userTokens?: ActivityRoleMember[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
