import { ApiLink } from "./ApiLink";
import { FieldDefinitionCollection } from "./FieldDefinitionCollection";
import { User } from "./User";

/**
 * Representation of a FieldGroup.
 */
export interface FieldGroup {
  /** Gets the creation datetime in UTC time. */
  createdOn: string;
  /** Gets the Id of this field group. */
  id: string;
  /** Gets the last modification datetime in UTC time. */
  modifiedOn: string;
  /** Gets the name of this field group. */
  name: string;
  /**
   * The Tag value for this object as valid XML. Returned only when the
   * `select-fieldgroup: Tag` header is sent.
   */
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
