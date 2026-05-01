import { PmPagedLinks } from "./PmPagedCollection";

export interface GroupMembership {
  groupId?: number;
  userId?: number;
  _links?: PmPagedLinks;
}
