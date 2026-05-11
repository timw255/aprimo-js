/**
 * Representation of compare field rule condition.
 */
export interface CompareFieldValueRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "CompareFieldValue";
  /**
   * Compare expression to apply.
   */
  expression: string;
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
