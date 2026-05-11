import { BaseFieldDefinition } from "./BaseFieldDefinition";

/**
 * Representation of the definition of a SingleLineTextField. The value is a single
 * line of text (max 4000 chars), not containing newline characters.
 *
 * Spec schema: `Singlelinetextfielddefinition`. Discriminator value: `dataType = "singlelinetext"`.
 */
export interface SingleLineTextFieldDefinition extends BaseFieldDefinition {
  /** The maximum length for the field. Format: int32. */
  maximumLength: number;
  /** The minimum length for the field. Format: int32. */
  minimumLength: number;
  /** A regular expression for validating the field. */
  regularExpression: string;
}
