/**
 * Representation of Content Type Changed rule condition.
 */
export interface ContentTypeChangedRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "ContentTypeChanged";
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
