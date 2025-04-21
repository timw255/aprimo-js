import { ApiLink } from "./ApiLink";
import { RecordLinkFieldConditions } from "./RecordLinkFieldConditions";
import { RecordLinkFieldDefinition } from "./RecordLinkFieldDefinition";
import { RecordLinkFieldValues } from "./RecordLinkFieldValues";

export interface RecordLinkField {
  dataType: string;
  fieldName: string;
  id: string;
  inheritable: boolean;
  inheritanceState: string;
  label: string;
  localizedValues: RecordLinkFieldValues[];
  recordLinkConditions: RecordLinkFieldConditions;
  _links: RecordLinkFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof RecordLinkFieldLinks,
      "self"
    >]?: RecordLinkFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface RecordLinkFieldLinks {
  self: ApiLink;
  definition: ApiLink<RecordLinkFieldDefinition>;
}
