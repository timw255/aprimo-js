import { ApiLink } from "./ApiLink";
import { HyperlinkListFieldValues } from "./HyperlinkListFieldValue";

export interface HyperlinkListField {
  dataType: string;
  fieldName: string;
  id: string;
  inheritable: boolean;
  inheritanceState: string;
  label: string;
  localizedValues: HyperlinkListFieldValues[];
  _links: HyperlinkListFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof HyperlinkListFieldLinks,
      "self"
    >]?: HyperlinkListFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface HyperlinkListFieldLinks {
  self: ApiLink;
  definition: ApiLink;
}
