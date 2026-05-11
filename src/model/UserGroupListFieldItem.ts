import { ApiLink } from "./ApiLink";
import { PermissionValueCollection } from "./PermissionValueCollection";
import { User } from "./User";

/**
 * Representation of a User Group as a possible filtered value for a UserGroupListField.
 */
export interface UserGroupListFieldItem {
  /** Gets the creation datetime in UTC time. */
  createdOn: string;
  /** Gets the Id of this user group. */
  id: string;
  /** Gets whether the user group is still active or not. */
  isActive: boolean;
  /** Gets the last modification datetime in UTC time. */
  modifiedOn: string;
  /** Gets the name of the user group. */
  name: string;
  /** Gets the organization associated with this user group. */
  organizationId: string;
  /** Gets the value for the Tag of this object. The value of this property should be valid Xml. This property will not be returned by default. In order to include the property in the response, add a header with the name 'select-usergrouplistfielditem' and the value 'Tag' to your request. */
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
