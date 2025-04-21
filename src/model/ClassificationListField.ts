import { ApiLink } from "./ApiLink";
import { ClassificationListFieldValues } from "./ClassificationListFieldValues";
import { ClassificationListFieldDefinition } from "./ClassificationListFieldDefinition";

export interface ClassificationListField {
  dataType: string;
  fieldName: string;
  id: string;
  inheritanceState: string;
  label: string;
  localizedValues: ClassificationListFieldValues[];
  _links: ClassificationListFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof ClassificationListFieldLinks,
      "self"
    >]?: ClassificationListFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface ClassificationListFieldLinks {
  self: ApiLink;
  definition: ApiLink<ClassificationListFieldDefinition>;
}
