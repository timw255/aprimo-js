import { ApiLink } from "./ApiLink";
import { LanguageListFieldDefinition } from "./LanguageListFieldDefinition";
import { LanguageListFieldValues } from "./LanguageListFieldValues";

export interface LanguageListField {
  dataType: string;
  fieldName: string;
  id: string;
  inheritable: boolean;
  inheritanceState: string;
  label: string;
  localizedValues: LanguageListFieldValues[];
  _links: LanguageListFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof LanguageListFieldLinks,
      "self"
    >]?: LanguageListFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface LanguageListFieldLinks {
  self: ApiLink;
  definition: ApiLink<LanguageListFieldDefinition>;
}
