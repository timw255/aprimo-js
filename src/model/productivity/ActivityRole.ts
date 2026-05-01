import { PmPagedLinks } from "./PmPagedCollection";

export interface ActivityRoleMember {
  id: number;
}

export interface ActivityRole {
  activityRoleId?: number;
  userRoleId: number;
  activityId?: number;
  users?: ActivityRoleMember[];
  userTokens?: ActivityRoleMember[];
  _links?: PmPagedLinks;
}
