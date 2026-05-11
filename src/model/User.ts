import { ApiLink } from "./ApiLink";
import { FieldCollection } from "./FieldCollection";
import { Image } from "./Image";
import { PermissionValueCollection } from "./PermissionValueCollection";
import { UserGroupCollection } from "./UserGroupCollection";

/**
 * Representation of a user.
 */
export interface User {
  /** Get the aprimo user id value. Format: int32. */
  aprimoUserId: number;
  /** Gets the creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** Gets the email address of this user. The email address is not required and has a maximum length of 254 characters. */
  email: string;
  /** Gets the date on which this user account will expire. Format: date-time. */
  expirationDate: string;
  /** Gets the first name of this user. This first name is not required and has a maximum length of 200 characters. */
  firstName: string;
  /** Gets the Id of this user. AprimoId. */
  id: string;
  /** Gets the URI of the image of this user. */
  imageUri: string;
  /** Gets whether the user is still active or not. */
  isActive: boolean;
  /** Gets the default language used by this user for the static text displayed on the user interfaces. AprimoId. */
  languageForUIId: string;
  /** Gets the default language used by this user when accessing fields. AprimoId. */
  languageId: string;
  /** Gets the last name of this user. This last name is not required and has a maximum length of 200 characters. */
  lastName: string;
  /** Returns the last UTC date on which someone successfully logged in using this user's account. Returns null if no one has ever logged in using this account. Format: date-time. */
  lastSuccessfulLogOnDate: string;
  /** Gets the last modification datetime in UTC time. Format: date-time. */
  modifiedOn: string;
  /** Gets the name of this user. This name is required, has to be unique, is not case sensitive and has a maximum length of 50 characters. */
  name: string;
  /** Returns the second last date on which someone successfully logged in using this user's account. Returns null if no one has ever logged in using this account. Format: date-time. */
  secondLastSuccessfulLogOnDate: string;
  /** Gets the maximum number of bytes that a user can own. The unit used is bytes. Format: int64. */
  storageQuota: number;
  /** Gets the sum of all the filesizes of which this user is the owner. The unit used is bytes. Format: int64. */
  storageUsed: number;
  /** Gets the value for the Tag of this object. The value of this property should be valid Xml. This property will not be returned by default. To include it, add a header 'select-user' with value 'Tag' to your request. */
  tag: string;
  /** HAL links for this user. */
  _links: UserLinks;
  /** Embedded resources corresponding to non-self links when requested via the `select` parameter. */
  _embedded?: {
    [K in Exclude<keyof UserLinks, "self">]?: UserLinks[K] extends ApiLink<
      infer R
    >
      ? R
      : never;
  };
}

/**
 * HAL links for a {@link User}.
 */
export interface UserLinks {
  /** Link to this user. */
  self: ApiLink;
  /** Link to the user's fields. */
  fields: ApiLink<FieldCollection>;
  /** Link to the user's group memberships. */
  memberships: ApiLink<UserGroupCollection>;
  /** Link to the user's direct permissions. */
  permissions: ApiLink<PermissionValueCollection>;
  /** Link to the user's profile image. */
  image: ApiLink<Image>;
  /** Link to the user who last modified this user. */
  modifiedby: ApiLink<User>;
  /** Link to the user who created this user. */
  createdby: ApiLink<User>;
}
