import { ApiLink } from "./ApiLink";
import { TimeFieldDefinition } from "./TimeFieldDefinition";
import { TimeFieldValue } from "./TimeFieldValue";

export interface TimeField {
  dataType: string;
  fieldName: string;
  id: string;
  inheritable: boolean;
  inheritanceState: string;
  label: string;
  localizedValues: TimeFieldValue[];
  _links: TimeFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof TimeFieldLinks,
      "self"
    >]?: TimeFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface TimeFieldLinks {
  self: ApiLink;
  definition: ApiLink<TimeFieldDefinition>;
}
