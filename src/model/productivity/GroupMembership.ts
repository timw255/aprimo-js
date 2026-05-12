import { PmPagedLinks } from "./PmPagedCollection";

/**
 * A single user↔group membership row, as returned by
 * `groupMemberships.getByGroupId`.
 */
export interface GroupMembership {
  /** Group the user belongs to. */
  groupId?: number;
  /** User in the membership. */
  userId?: number;
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
