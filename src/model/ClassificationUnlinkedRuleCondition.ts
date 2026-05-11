/**
 * Representation of Classification unlinked rule.
 */
export interface ClassificationUnlinkedRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "ClassificationUnlinked";
  /**
   * Classification id.
   */
  classificationId: string;
  /** Specifies whether is directly linked or not. */
  directLinkOnly?: boolean;
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
