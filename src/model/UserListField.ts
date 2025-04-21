import { ApiLink } from "./ApiLink";
import { UserListFieldDefinition } from "./UserListFieldDefinition";
import { UserListFieldValues } from "./UserListFieldValues";

export interface UserListField {
  dataType: string;
  fieldName: string;
  id: string;
  inheritable: boolean;
  inheritanceState: string;
  label: string;
  localizedValues: UserListFieldValues[];
  _links: UserListFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof UserListFieldLinks,
      "self"
    >]?: UserListFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface UserListFieldLinks {
  self: ApiLink;
  definition: ApiLink<UserListFieldDefinition>;
}
