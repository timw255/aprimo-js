import { BaseFieldDefinition } from "./BaseFieldDefinition";

export interface NumericFieldDefinition extends BaseFieldDefinition {
  accuracy: number;
  range: string;
}
