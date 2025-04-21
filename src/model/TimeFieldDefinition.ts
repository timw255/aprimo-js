import { BaseFieldDefinition } from "./BaseFieldDefinition";

export interface TimeFieldDefinition extends BaseFieldDefinition {
  timePattern: string;
}
