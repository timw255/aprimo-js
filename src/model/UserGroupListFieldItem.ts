import { ApiLink } from "./ApiLink";
import { PermissionValueCollection } from "./PermissionValueCollection";
import { User } from "./User";

export interface UserGroupListFieldItem {
  createdOn: string;
  id: string;
  modifiedOn: string;
  name: string;
  organizationId: string;
  tag: string;
  _links: UserGroupListFieldItemLinks;
  _embedded?: {
    [K in Exclude<
      keyof UserGroupListFieldItemLinks,
      "self"
    >]?: UserGroupListFieldItemLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface UserGroupListFieldItemLinks {
  self: ApiLink;
  permissions: ApiLink<PermissionValueCollection>;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
