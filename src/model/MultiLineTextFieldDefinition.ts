import { BaseFieldDefinition } from "./BaseFieldDefinition";

/**
 * Representation of the definition of a MultiLineTextField. The value is multi-line
 * text with no practical length limit.
 *
 * Spec schema: `Multilinetextfielddefinition`. Discriminator value: `dataType = "multilinetext"`.
 */
export interface MultiLineTextFieldDefinition extends BaseFieldDefinition {
  /** The maximum length for the field. Format: int32. */
  maximumLength: number;
  /** The minimum length for the field. Format: int32. */
  minimumLength: number;
  /** A regular expression for validating the field. */
  regularExpression: string;
}
