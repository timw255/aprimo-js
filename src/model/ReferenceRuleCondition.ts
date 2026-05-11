/**
 * Representation of Reference Match rule.
 */
export interface ReferenceRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "Reference";
  /**
   * Reference to be executed.
   */
  reference: string;
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
