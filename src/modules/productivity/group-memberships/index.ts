import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { GroupMembership } from "../../../model/productivity/GroupMembership";
import { PmPagedCollection } from "../../../model/productivity/PmPagedCollection";

export const groupMemberships = (client: HttpClient) => ({
  getByGroupId: async (
    groupId: number | string,
  ): Promise<
    ApiResult<PmPagedCollection<GroupMembership, "membership" | "memberships">>
  > => {
    return client.get(`/api/groups/${groupId}/membership`);
  },
});
