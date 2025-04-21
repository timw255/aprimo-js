import { ApiLink } from "./ApiLink";
import { HtmlFieldDefinition } from "./HtmlFieldDefinition";
import { HtmlFieldValue } from "./HtmlFieldValue";

export interface HtmlField {
  dataType: string;
  fieldName: string;
  id: string;
  inheritable: boolean;
  inheritanceState: string;
  label: string;
  localizedValues: HtmlFieldValue[];
  _links: HtmlFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof HtmlFieldLinks,
      "self"
    >]?: HtmlFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface HtmlFieldLinks {
  self: ApiLink;
  definition: ApiLink<HtmlFieldDefinition>;
}
