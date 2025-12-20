import { ApiLink } from "./ApiLink";
import { FieldCollection } from "./FieldCollection";
import { Image } from "./Image";
import { PermissionValueCollection } from "./PermissionValueCollection";
import { UserGroupCollection } from "./UserGroupCollection";

export interface User {
  aprimoUserId: number;
  createdOn: string;
  email: string;
  expirationDate: string;
  firstName: string;
  id: string;
  imageUri: string;
  isActive: boolean;
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
  _links: UserLinks;
  _embedded?: {
    [K in Exclude<keyof UserLinks, "self">]?: UserLinks[K] extends ApiLink<
      infer R
    >
      ? R
      : never;
  };
}

export interface UserLinks {
  self: ApiLink;
  fields: ApiLink<FieldCollection>;
  memberships: ApiLink<UserGroupCollection>;
  permissions: ApiLink<PermissionValueCollection>;
  image: ApiLink<Image>;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
