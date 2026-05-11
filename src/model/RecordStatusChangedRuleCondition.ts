/**
 * Representation of record status changed rule condition.
 */
export interface RecordStatusChangedRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "RecordStatusChanged";
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
