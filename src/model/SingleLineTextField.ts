import { ApiLink } from "./ApiLink";
import { SingleLineTextFieldDefinition } from "./SingleLineTextFieldDefinition";
import { SingleLineTextFieldValue } from "./SingleLineTextFieldValue";

export interface SingleLineTextField {
  dataType: string;
  fieldName: string;
  id: string;
  inheritable: boolean;
  inheritanceState: string;
  label: string;
  localizedValues: SingleLineTextFieldValue[];
  _links: SingleLineTextFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof SingleLineTextFieldLinks,
      "self"
    >]?: SingleLineTextFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface SingleLineTextFieldLinks {
  self: ApiLink;
  definition: ApiLink<SingleLineTextFieldDefinition>;
}
