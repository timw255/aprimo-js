import { BaseFieldDefinition } from "./BaseFieldDefinition";

export interface MultiLineTextFieldDefinition extends BaseFieldDefinition {
  maximumLength: number;
  minimumLength: number;
  regularExpression: string;
}
