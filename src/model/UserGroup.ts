import { ApiLink } from "./ApiLink";
import { PermissionValueCollection } from "./PermissionValueCollection";
import { User } from "./User";

export interface UserGroup {
  createdOn: string;
  id: string;
  modifiedOn: string;
  name: string;
  isActive: boolean;
  organizationId: string;
  tag: string;
  _links: UserGroupLinks;
  _embedded?: {
    [K in Exclude<
      keyof UserGroupLinks,
      "self"
    >]?: UserGroupLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface UserGroupLinks {
  self: ApiLink;
  permissions: ApiLink<PermissionValueCollection>;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
