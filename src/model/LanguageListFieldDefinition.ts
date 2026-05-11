import { BaseFieldDefinition } from "./BaseFieldDefinition";
import { ApiLink } from "./ApiLink";
import { User } from "./User";

/**
 * Representation of the definition of a LanguageListField. References to languages
 * (values are stored as GUIDs).
 *
 * Spec schema: `Languagelistfielddefinition`. Discriminator value: `dataType = "languagelist"`.
 * The schema declares no properties beyond those inherited from the base field definition.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LanguageListFieldDefinition extends BaseFieldDefinition {}

/**
 * HAL `_links` map for {@link LanguageListFieldDefinition}.
 */
export interface LanguageListFieldDefinitionLinks {
  /** Link to this language list field definition resource. */
  self: ApiLink;
  /** Link to the user who created this field definition. */
  createdby: ApiLink<User>;
  /** Link to the user who last modified this field definition. */
  modifiedby: ApiLink<User>;
}
