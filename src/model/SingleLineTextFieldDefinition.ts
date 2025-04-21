import { BaseFieldDefinition } from "./BaseFieldDefinition";

export interface SingleLineTextFieldDefinition extends BaseFieldDefinition {
  maximumLength: number;
  minimumLength: number;
  regularExpression: string;
}
