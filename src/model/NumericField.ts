import { ApiLink } from "./ApiLink";
import { NumericFieldDefinition } from "./NumericFieldDefinition";
import { NumericFieldValue } from "./NumericFieldValue";

export interface NumericField {
  dataType: string;
  fieldName: string;
  id: string;
  inheritable: boolean;
  inheritanceState: string;
  label: string;
  localizedValues: NumericFieldValue[];
  _links: NumericFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof NumericFieldLinks,
      "self"
    >]?: NumericFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface NumericFieldLinks {
  self: ApiLink;
  definition: ApiLink<NumericFieldDefinition>;
}
