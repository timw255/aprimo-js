import { ApiLink } from "./ApiLink";
import { NumericFieldDefinition } from "./NumericFieldDefinition";
import { NumericFieldValue } from "./NumericFieldValue";

/**
 * Representation of a NumericField.
 */
export interface NumericField {
  /**
   * Gets or sets the data type of this field.
   */
  dataType: "Numeric";
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
  localizedValues: NumericFieldValue[];
  _links: NumericFieldLinks;
  _embedded?: {
    [K in Exclude<
      keyof NumericFieldLinks,
      "self"
    >]?: NumericFieldLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface NumericFieldLinks {
  self: ApiLink;
  definition: ApiLink<NumericFieldDefinition>;
}
