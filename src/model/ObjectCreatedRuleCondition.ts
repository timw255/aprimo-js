/**
 * Representation of Object Created rule condition.
 */
export interface ObjectCreatedRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "ObjectCreated";
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
