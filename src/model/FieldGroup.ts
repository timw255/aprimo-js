import { ApiLink } from "./ApiLink";
import { FieldDefinitionCollection } from "./FieldDefinitionCollection";
import { User } from "./User";

export interface FieldGroup {
  createdOn: string;
  id: string;
  modifiedOn: string;
  name: string;
  tag: string;
  _links: FieldGroupLinks;
  _embedded?: {
    [K in Exclude<
      keyof FieldGroupLinks,
      "self"
    >]?: FieldGroupLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface FieldGroupLinks {
  self: ApiLink;
  members: ApiLink<FieldDefinitionCollection>;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
