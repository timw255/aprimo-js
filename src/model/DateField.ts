import { ApiLink } from "./ApiLink";
import { DateFieldValue } from "./DateFieldValue";

/**
 * Representation of a DateField.
 */
export interface DateField {
  /**
   * Gets or sets the data type of this field.
   */
  dataType: "Date";
  /** Gets the name of this field. */
  fieldName: string;
  /** Gets the id of this field. */
  id: string;
  /**
   * Gets whether the field value can be used as a parent in inheritance hierarchy.
   * This property will not be returned by default. In order to include the property in
   * the response, add a header with the name 'select-field' and the value 'Inheritable'
   * to your request.
   */
  inheritable: boolean;
  /**
   * Gets the Inheritance State of this field. This property will not be returned by
   * default. In order to include the property in the response, add a header with the
   * name 'select-field' and the value 'InheritanceState' to your request.
   */
  inheritanceState: "None" | "Inherited";
  /** Gets the label of this field. */
  label: string;
  /** Gets the language specific data of this field. */
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
