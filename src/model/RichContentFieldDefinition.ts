import { BaseFieldDefinition } from "./BaseFieldDefinition";
import { ApiLink } from "./ApiLink";
import { User } from "./User";

export interface RichContentFieldDefinition extends BaseFieldDefinition {
  allowCharacterStyling: boolean;
  allowEmojis: boolean;
  allowHashtags: boolean;
  allowHyperLinks: boolean;
  allowInsertAssets: boolean;
}

export interface RichContentFieldDefinitionLinks {
  self: ApiLink;
  createdby: ApiLink<User>;
  modifiedby: ApiLink<User>;
}
