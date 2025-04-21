import { BaseFieldDefinition } from "./BaseFieldDefinition";
import { ApiLink } from "./ApiLink";
import { User } from "./User";

export interface TextListFieldDefinition extends BaseFieldDefinition {
  aiEnabled: boolean;
}

export interface TextListFieldDefinitionLinks {
  self: ApiLink;
  createdby: ApiLink<User>;
  modifiedby: ApiLink<User>;
}
