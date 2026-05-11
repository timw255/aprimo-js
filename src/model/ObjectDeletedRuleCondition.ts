/**
 * Representation of Object Deleted rule condition.
 */
export interface ObjectDeletedRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "ObjectDeleted";
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
