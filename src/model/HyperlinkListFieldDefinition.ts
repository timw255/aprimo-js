import { BaseFieldDefinition } from "./BaseFieldDefinition";
import { ApiLink } from "./ApiLink";
import { User } from "./User";

/**
 * Representation of the definition of a HyperlinkListField. The value is a
 * collection of URL + display text pairs.
 *
 * Spec schema: `Hyperlinklistfielddefinition`. Discriminator value: `dataType = "hyperlinklist"`.
 * The schema declares no properties beyond those inherited from the base field definition.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HyperlinkListFieldDefinition extends BaseFieldDefinition {}

/**
 * HAL `_links` map for {@link HyperlinkListFieldDefinition}.
 */
export interface HyperlinkListFieldDefinitionLinks {
  /** Link to this hyperlink list field definition resource. */
  self: ApiLink;
  /** Link to the user who created this field definition. */
  createdby: ApiLink<User>;
  /** Link to the user who last modified this field definition. */
  modifiedby: ApiLink<User>;
}
