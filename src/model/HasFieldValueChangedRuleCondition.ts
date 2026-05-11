/**
 * Representation of Has Field Value Changed rule condition.
 */
export interface HasFieldValueChangedRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "HasFieldValueChanged";
  /**
   * Id of the field whose value is watched.
   */
  fieldDefinitionId: string;
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
