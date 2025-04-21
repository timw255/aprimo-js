import { ApiLink } from "./ApiLink";
import { MultiLineTextFieldDefinition } from "./MultiLineTextFieldDefinition";
import { MultiLineTextFieldValue } from "./MultiLineTextFieldValue";

export interface MultiLineTextField {
  dataType: string;
  fieldName: string;
  id: string;
  inheritable: boolean;
  inheritanceState: string;
  label: string;
  localizedValues: MultiLineTextFieldValue[];
  _links: MultiLineTextFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof MultiLineTextFieldLinks,
      "self"
    >]?: MultiLineTextFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface MultiLineTextFieldLinks {
  self: ApiLink;
  definition: ApiLink<MultiLineTextFieldDefinition>;
}
