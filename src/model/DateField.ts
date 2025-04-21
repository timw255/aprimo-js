import { ApiLink } from "./ApiLink";
import { DateFieldValue } from "./DateFieldValue";

export interface DateField {
  dataType: string;
  fieldName: string;
  id: string;
  inheritable: boolean;
  inheritanceState: string;
  label: string;
  localizedValues: DateFieldValue[];
  _links: DateFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof DateFieldLinks,
      "self"
    >]?: DateFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface DateFieldLinks {
  self: ApiLink;
  definition: ApiLink;
}
