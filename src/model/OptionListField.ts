import { ApiLink } from "./ApiLink";
import { OptionListFieldDefinition } from "./OptionListFieldDefinition";
import { OptionListFieldValues } from "./OptionListFieldValues";

export interface OptionListField {
  dataType: string;
  fieldName: string;
  id: string;
  inheritable: boolean;
  inheritanceState: string;
  label: string;
  localizedValues: OptionListFieldValues[];
  _links: OptionListFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof OptionListFieldLinks,
      "self"
    >]?: OptionListFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface OptionListFieldLinks {
  self: ApiLink;
  definition: ApiLink<OptionListFieldDefinition>;
}
