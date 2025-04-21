import { ApiLink } from "./ApiLink";
import { JsonFieldDefinition } from "./JsonFieldDefinition";
import { JsonFieldValue } from "./JsonFieldValue";

export interface JsonField {
  dataType: string;
  fieldName: string;
  id: string;
  inheritable: boolean;
  inheritanceState: string;
  label: string;
  localizedValues: JsonFieldValue[];
  _links: JsonFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof JsonFieldLinks,
      "self"
    >]?: JsonFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface JsonFieldLinks {
  self: ApiLink;
  definition: ApiLink<JsonFieldDefinition>;
}
