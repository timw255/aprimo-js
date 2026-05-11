/**
 * Representation of File Added rule condition.
 */
export interface FileAddedRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "FileAdded";
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
