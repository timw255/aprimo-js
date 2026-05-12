import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { GroupMembership } from "../../../model/productivity/GroupMembership";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";

/**
 * Group membership reads. To mutate membership, use {@link groups}.update
 * with the `users` field instead — this module is read-only.
 */
export const groupMemberships = (client: HttpClient) => ({
  /**
   * List the users that belong to a group.
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.groupMemberships.getByGroupId(42);
   * ```
   */
  getByGroupId: async (
    groupId: number | string,
  ): Promise<
    ApiResult<PmPagedCollection<GroupMembership, "group-membership">>
  > => {
    return client.get(`/api/groups/${groupId}/membership`);
  },
});
