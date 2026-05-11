import { ApiLink } from "./ApiLink";
import { HyperlinkListFieldValues } from "./HyperlinkListFieldValue";

/**
 * Representation of an hyperlink list field.
 */
export interface HyperlinkListField {
  /**
   * Gets or sets the data type of this field.
   */
  dataType: "HyperlinkList";
  /** Gets the name of this field. */
  fieldName: string;
  /** Gets the id of this field. */
  id: string;
  /** Gets whether the field value can be used as a parent in inheritance hierarchy. This property will not be returned by default. In order to include the property in the response, add a header with the name 'select-field' and the value 'Inheritable' to your request. */
  inheritable: boolean;
  /**
   * Gets the Inheritance State of this field. This property will not be returned by default. In order to include the property in the response, add a header with the name 'select-field' and the value 'InheritanceState' to your request.
   */
  inheritanceState: "None" | "Inherited";
  /** Gets the label of this field. */
  label: string;
  /** Gets the language specific data of this field. */
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
