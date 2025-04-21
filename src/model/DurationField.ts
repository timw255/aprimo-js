import { ApiLink } from "./ApiLink";
import { DurationFieldDefinition } from "./DurationFieldDefinition";
import { DurationFieldValue } from "./DurationFieldValue";

export interface DurationField {
  dataType: string;
  fieldName: string;
  id: string;
  inheritable: boolean;
  inheritanceState: string;
  label: string;
  localizedValues: DurationFieldValue[];
  _links: DurationFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof DurationFieldLinks,
      "self"
    >]?: DurationFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface DurationFieldLinks {
  self: ApiLink;
  definition: ApiLink<DurationFieldDefinition>;
}
