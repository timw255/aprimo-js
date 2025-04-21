import { ApiLink } from "./ApiLink";
import { RecordListFieldDefinition } from "./RecordListFieldDefinition";
import { RecordListFieldValues } from "./RecordListFieldValues";

export interface RecordListField {
  dataType: string;
  fieldName: string;
  id: string;
  inheritable: boolean;
  inheritanceState: string;
  label: string;
  localizedValues: RecordListFieldValues[];
  _links: RecordListFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof RecordListFieldLinks,
      "self"
    >]?: RecordListFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface RecordListFieldLinks {
  self: ApiLink;
  definition: ApiLink<RecordListFieldDefinition>;
}
