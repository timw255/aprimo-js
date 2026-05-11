/**
 * Representation of Object Changed rule condition.
 */
export interface ObjectChangedRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "ObjectChanged";
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
