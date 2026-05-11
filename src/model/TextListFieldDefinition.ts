import { BaseFieldDefinition } from "./BaseFieldDefinition";
import { ApiLink } from "./ApiLink";
import { User } from "./User";

/**
 * Representation of the definition of a TextListField. The value is an array of
 * text values.
 *
 * Spec schema: `Textlistfielddefinition`. Discriminator value: `dataType = "textlist"`.
 */
export interface TextListFieldDefinition extends BaseFieldDefinition {
  /** Indicates whether to allow AI enhancement. */
  aiEnabled: boolean;
}

/**
 * HAL `_links` map for {@link TextListFieldDefinition}.
 */
export interface TextListFieldDefinitionLinks {
  /** Link to this text list field definition resource. */
  self: ApiLink;
  /** Link to the user who created this field definition. */
  createdby: ApiLink<User>;
  /** Link to the user who last modified this field definition. */
  modifiedby: ApiLink<User>;
}
