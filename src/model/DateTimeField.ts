import { ApiLink } from "./ApiLink";
import { DateTimeFieldDefinition } from "./DateTimeFieldDefinition";
import { DateTimeFieldValue } from "./DateTimeFieldValue";

export interface DateTimeField {
  dataType: string;
  fieldName: string;
  id: string;
  inheritable: boolean;
  inheritanceState: string;
  label: string;
  localizedValues: DateTimeFieldValue[];
  _links: DateTimeFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof DateTimeFieldLinks,
      "self"
    >]?: DateTimeFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface DateTimeFieldLinks {
  self: ApiLink;
  definition: ApiLink<DateTimeFieldDefinition>;
}
