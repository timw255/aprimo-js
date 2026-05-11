import { BaseFieldDefinition } from "./BaseFieldDefinition";

/**
 * Representation of the definition of an HtmlField. The value is valid HTML content.
 *
 * Spec schema: `Htmlfielddefinition`. Discriminator value: `dataType = "html"`.
 */
export interface HtmlFieldDefinition extends BaseFieldDefinition {
  /** The maximum length for the field. Format: int32. */
  maximumLength: number;
  /** The minimum length for the field. Format: int32. */
  minimumLength: number;
  /** A regular expression for validating the field. */
  regularExpression: string;
}
