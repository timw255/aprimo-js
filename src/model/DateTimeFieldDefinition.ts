import { BaseFieldDefinition } from "./BaseFieldDefinition";

export interface DateTimeFieldDefinition extends BaseFieldDefinition {
  datePattern: string;
  dateTimePattern: string;
  useUtc: boolean;
}
