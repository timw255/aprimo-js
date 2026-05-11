import { ApiLink } from "./ApiLink";
import { PermissionValueCollection } from "./PermissionValueCollection";
import { User } from "./User";

/**
 * Representation of a user group.
 */
export interface UserGroup {
  /** Gets the creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** Gets the Id of this user group. AprimoId. */
  id: string;
  /** Gets the last modification datetime in UTC time. Format: date-time. */
  modifiedOn: string;
  /** Gets the name of the user group. */
  name: string;
  /** Gets whether the user group is still active or not. */
  isActive: boolean;
  /** Gets the organization associated with this user group. AprimoId. */
  organizationId: string;
  /** Gets the value for the Tag of this object. Value should be valid Xml. Not returned by default; include header 'select-usergroup' with value 'Tag' to retrieve. */
  tag: string;
  /** HAL links for this user group. */
  _links: UserGroupLinks;
  /** Embedded resources corresponding to non-self links when requested via the `select` parameter. */
  _embedded?: {
    [K in Exclude<
      keyof UserGroupLinks,
      "self"
    >]?: UserGroupLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL links for a {@link UserGroup}.
 */
export interface UserGroupLinks {
  /** Link to this user group. */
  self: ApiLink;
  /** Link to the user group's permissions. */
  permissions: ApiLink<PermissionValueCollection>;
  /** Link to the user who last modified this user group. */
  modifiedby: ApiLink<User>;
  /** Link to the user who created this user group. */
  createdby: ApiLink<User>;
}
