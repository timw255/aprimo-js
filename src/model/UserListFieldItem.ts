import { ApiLink } from "./ApiLink";
import { FieldCollection } from "./FieldCollection";
import { Image } from "./Image";
import { PermissionValueCollection } from "./PermissionValueCollection";
import { User } from "./User";
import { UserGroupCollection } from "./UserGroupCollection";

/**
 * Representation of a User as a possible filtered value for a UserListField.
 */
export interface UserListFieldItem {
  /** Get the aprimo user id value. Format: int32. */
  aprimoUserId: number;
  /** Gets the creation datetime in UTC time. */
  createdOn: string;
  /** Gets the email addres of this user. The email address it not required and has a maximum length of 254 characters. */
  email: string;
  /** Gets the date on which this user account will expire. */
  expirationDate: string;
  /** Gets the first name of this user. This first name is not required and has a maximum length of 200 characters. */
  firstName: string;
  /** Gets the Id of this user. */
  id: string;
  /** Gets the URI of the image of this user. */
  imageUri: string;
  /** Gets whether the user is still active or not. */
  isActive: boolean;
  /** Gets the default language used by this user for the static text displayed on the user interfaces. */
  languageForUIId: string;
  /** Gets the default language used by this user when accessing fields. */
  languageId: string;
  /** Gets the last name of this user. This last name is not required and has a maximum length of 200 characters. */
  lastName: string;
  /** Returns the last UTC date on which someone successfully logged in using this user's account. It returns if no one has ever logged in using this account. */
  lastSuccessfulLogOnDate: string;
  /** Gets the last modification datetime in UTC time. */
  modifiedOn: string;
  /** Gets the name of this user. This name is required, has to be unique, is not case sensitive and has a maximum length of 50 characters. */
  name: string;
  /** Returns the second last date on which someone successfully logged in using this user's account. It returns if no one has ever logged in using this account. */
  secondLastSuccessfulLogOnDate: string;
  /** Gets the maximum number of bytes that a user can own. The unit used is bytes. Format: int64. */
  storageQuota: number;
  /** Gets the sum of all the filesizes of which this user is the owner. The unit used is bytes. Format: int64. */
  storageUsed: number;
  /** Gets the value for the Tag of this object. The value of this property should be valid Xml. This property will not be returned by default. In order to include the property in the response, add a header with the name 'select-userlistfielditem' and the value 'Tag' to your request. */
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
