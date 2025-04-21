import { BaseFieldDefinition } from "./BaseFieldDefinition";

export interface DateFieldDefinition extends BaseFieldDefinition {
  datePattern: string;
  yearMonthPattern: string;
}
