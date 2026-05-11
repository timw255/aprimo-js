import { ApiLink } from "./ApiLink";
import { User } from "./User";

/**
 * Representation of an access list. Access lists control which users and user
 * groups can access specific records.
 *
 * Select Header Options: Use `select-accesslist` header to include:
 * - `modifiedby` - User who last modified this access list
 * - `createdby` - User who created this access list
 */
export interface AccessList {
  /** Creation datetime in UTC. */
  createdOn: string;
  /** An optional external identifier for integration with other systems. */
  externalId: string;
  /** The unique identifier of this access list. */
  id: string;
  /** Last modification datetime in UTC. */
  modifiedOn: string;
  /** The permission level of this access list. Format: int32. */
  permission: number;
  /** Custom XML tag data. Requires `select-accesslist: Tag` header to be returned. */
  tag: string;
  /**
   * The type of this access list (e.g., "allow", "deny").
   */
  type: string;
  /** The IDs of user groups linked to this access list. */
  userGroups: string[];
  /** The IDs of users linked to this access list. */
  users: string[];
  _links: AccessListLinks;
  _embedded?: {
    [K in Exclude<
      keyof AccessListLinks,
      "self"
    >]?: AccessListLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface AccessListLinks {
  self: ApiLink;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
