import { BaseFieldDefinition } from "./BaseFieldDefinition";

/**
 * Representation of the definition of a TimeField. The value is a time in
 * `HH:mm:ss.fffffff` format.
 *
 * Spec schema: `Timefielddefinition`. Discriminator value: `dataType = "time"`.
 */
export interface TimeFieldDefinition extends BaseFieldDefinition {
  /** Time pattern for the TimeField. */
  timePattern: string;
}
