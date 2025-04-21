import { ApiLink } from "./ApiLink";
import { UserGroup } from "./UserGroup";

export interface UserGroupCollection {
  items: UserGroup[];
  _links: UserGroupCollectionLinks;
}

export interface UserGroupCollectionLinks {
  self: ApiLink;
}
