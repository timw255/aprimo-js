import { BaseFieldDefinition } from "./BaseFieldDefinition";

/**
 * Representation of the definition of a DateField. The value is a date in
 * `yyyy-MM-dd` format.
 *
 * Discriminator value: `dataType = "date"`.
 */
export interface DateFieldDefinition extends BaseFieldDefinition {
  /** The date pattern. */
  datePattern: string;
  /** The year-month pattern. */
  yearMonthPattern: string;
}
