import { BaseFieldDefinition } from "./BaseFieldDefinition";
import { ApiLink } from "./ApiLink";
import { User } from "./User";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface JsonFieldDefinition extends BaseFieldDefinition {}

export interface JsonFieldDefinitionLinks {
  self: ApiLink;
  createdby: ApiLink<User>;
  modifiedby: ApiLink<User>;
}
