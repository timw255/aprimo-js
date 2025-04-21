import { ApiLink } from "./ApiLink";
import { TextListFieldDefinition } from "./TextListFieldDefinition";
import { TextListFieldValues } from "./TextListFieldValues";

export interface TextListField {
  dataType: string;
  fieldName: string;
  id: string;
  inheritable: boolean;
  inheritanceState: string;
  label: string;
  localizedValues: TextListFieldValues[];
  _links: TextListFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof TextListFieldLinks,
      "self"
    >]?: TextListFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface TextListFieldLinks {
  self: ApiLink;
  definition: ApiLink<TextListFieldDefinition>;
}
