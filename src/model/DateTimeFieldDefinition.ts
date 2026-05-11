import { BaseFieldDefinition } from "./BaseFieldDefinition";

/**
 * Representation of the definition of a DateTimeField. The value is an ISO 8601 datetime.
 *
 * Spec schema: `Datetimefielddefinition`. Discriminator value: `dataType = "datetime"`.
 */
export interface DateTimeFieldDefinition extends BaseFieldDefinition {
  /** The date pattern. */
  datePattern: string;
  /** The datetime pattern. */
  dateTimePattern: string;
  /** Whether UTC is used for the datetime value. */
  useUtc: boolean;
}
