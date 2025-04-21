import { ApiLink } from "./ApiLink";
import { FieldCollection } from "./FieldCollection";
import { Image } from "./Image";
import { PermissionValueCollection } from "./PermissionValueCollection";
import { User } from "./User";
import { UserGroupCollection } from "./UserGroupCollection";

export interface UserListFieldItem {
  aprimoUserId: number;
  createdOn: string;
  email: string;
  expirationDate: string;
  firstName: string;
  id: string;
  imageUri: string;
  languageForUIId: string;
  languageId: string;
  lastName: string;
  lastSuccessfulLogOnDate: string;
  modifiedOn: string;
  name: string;
  secondLastSuccessfulLogOnDate: string;
  storageQuota: number;
  storageUsed: number;
  tag: string;
  _links: UserListFieldItemLinks;
  _embedded?: {
    [K in Exclude<
      keyof UserListFieldItemLinks,
      "self"
    >]?: UserListFieldItemLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface UserListFieldItemLinks {
  self: ApiLink;
  fields: ApiLink<FieldCollection>;
  memberships: ApiLink<UserGroupCollection>;
  permissions: ApiLink<PermissionValueCollection>;
  image: ApiLink<Image>;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
