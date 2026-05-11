/**
 * Representation of record status is rule condition.
 */
export interface RecordStatusIsRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "RecordStatusIs";
  /**
   * Status.
   */
  status: string;
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
