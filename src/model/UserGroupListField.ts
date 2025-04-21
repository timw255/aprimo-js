import { ApiLink } from "./ApiLink";
import { UserGroupListFieldDefinition } from "./UserGroupListFieldDefinition";
import { UserGroupListFieldValues } from "./UserGroupListFieldValues";

export interface UserGroupListField {
  dataType: string;
  fieldName: string;
  id: string;
  inheritable: boolean;
  inheritanceState: string;
  label: string;
  localizedValues: UserGroupListFieldValues[];
  _links: UserGroupListFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof UserGroupListFieldLinks,
      "self"
    >]?: UserGroupListFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface UserGroupListFieldLinks {
  self: ApiLink;
  definition: ApiLink<UserGroupListFieldDefinition>;
}
