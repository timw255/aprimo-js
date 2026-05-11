import { BaseFieldDefinition } from "./BaseFieldDefinition";
import { ApiLink } from "./ApiLink";
import { User } from "./User";

/**
 * Representation of the definition of a JsonField. The value is JSON content.
 *
 * Spec schema: `Jsonfielddefinition`. Discriminator value: `dataType = "json"`.
 * The schema declares no properties beyond those inherited from the base field definition.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface JsonFieldDefinition extends BaseFieldDefinition {}

/**
 * HAL `_links` map for {@link JsonFieldDefinition}.
 */
export interface JsonFieldDefinitionLinks {
  /** Link to this JSON field definition resource. */
  self: ApiLink;
  /** Link to the user who created this field definition. */
  createdby: ApiLink<User>;
  /** Link to the user who last modified this field definition. */
  modifiedby: ApiLink<User>;
}
