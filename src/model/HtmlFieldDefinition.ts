import { BaseFieldDefinition } from "./BaseFieldDefinition";

export interface HtmlFieldDefinition extends BaseFieldDefinition {
  maximumLength: number;
  minimumLength: number;
  regularExpression: string;
}
