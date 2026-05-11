import { BaseFieldDefinition } from "./BaseFieldDefinition";

/**
 * Representation of the definition of a NumericField. The value is a decimal number
 * formatted using InvariantCulture.
 *
 * Spec schema: `Numericfielddefinition`. Discriminator value: `dataType = "numeric"`.
 */
export interface NumericFieldDefinition extends BaseFieldDefinition {
  /** The accuracy (number of decimal places). */
  accuracy: number;
  /** The numeric range constraint. */
  range: string;
}
