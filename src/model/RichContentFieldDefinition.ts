import { BaseFieldDefinition } from "./BaseFieldDefinition";
import { ApiLink } from "./ApiLink";
import { User } from "./User";

/**
 * Representation of the definition of a RichContentField.
 */
export interface RichContentFieldDefinition extends BaseFieldDefinition {
  /** Whether character-level styling (bold, italic, etc.) is allowed. */
  allowCharacterStyling: boolean;
  /** Whether emojis are allowed. */
  allowEmojis: boolean;
  /** Whether hashtags are allowed. */
  allowHashtags: boolean;
  /** Whether hyperlinks are allowed. */
  allowHyperLinks: boolean;
  /** Whether inserting assets into the rich content is allowed. */
  allowInsertAssets: boolean;
}

/**
 * HAL `_links` map for {@link RichContentFieldDefinition}.
 */
export interface RichContentFieldDefinitionLinks {
  /** Link to this rich content field definition resource. */
  self: ApiLink;
  /** Link to the user who created this field definition. */
  createdby: ApiLink<User>;
  /** Link to the user who last modified this field definition. */
  modifiedby: ApiLink<User>;
}
