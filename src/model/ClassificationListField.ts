import { ApiLink } from "./ApiLink";
import { ClassificationListFieldValues } from "./ClassificationListFieldValues";
import { ClassificationListFieldDefinition } from "./ClassificationListFieldDefinition";

/**
 * Representation of a ClassificationListField.
 */
export interface ClassificationListField {
  /**
   * The data type of this field.
   */
  dataType: "ClassificationList";
  /** The name of this field. */
  fieldName: string;
  /** The id of this field. */
  id: string;
  /**
   * The Inheritance State of this field. Not returned by default; include `select-field: InheritanceState` header.
   */
  inheritanceState: "None" | "Inherited";
  /** The label of this field. */
  label: string;
  /** The language-specific data of this field. */
  localizedValues: ClassificationListFieldValues[];
  /** HAL-style hypermedia links for this resource. */
  _links: ClassificationListFieldLinks;
  /** Embedded related resources, keyed by link relation. */
  _embedded?: {
    [K in Exclude<
      keyof ClassificationListFieldLinks,
      "self"
    >]?: ClassificationListFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/** HAL-style link relations exposed on a ClassificationListField. */
export interface ClassificationListFieldLinks {
  /** Self link to this field. */
  self: ApiLink;
  /** Link to the field definition. */
  definition: ApiLink<ClassificationListFieldDefinition>;
}
