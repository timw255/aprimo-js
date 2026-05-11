/**
 * Representation of Object Created Or Changed rule condition.
 */
export interface ObjectCreatedOrChangedRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "ObjectCreatedOrChanged";
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
