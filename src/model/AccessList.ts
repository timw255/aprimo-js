import { ApiLink } from "./ApiLink";
import { User } from "./User";

export interface AccessList {
  createdOn: string;
  externalId: string;
  id: string;
  modifiedOn: string;
  permission: number;
  tag: string;
  type: string;
  userGroups: string[];
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
