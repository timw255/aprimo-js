import { ApiLink } from "./ApiLink";
import { RichContentFieldDefinition } from "./RichContentFieldDefinition";
import { RichContentFieldValue } from "./RichContentFieldValue";

export interface RichContentField {
  dataType: string;
  fieldName: string;
  id: string;
  inheritable: boolean;
  inheritanceState: string;
  label: string;
  localizedValues: RichContentFieldValue[];
  _links: RichContentFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof RichContentFieldLinks,
      "self"
    >]?: RichContentFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface RichContentFieldLinks {
  self: ApiLink;
  definition: ApiLink<RichContentFieldDefinition>;
}
