/**
 * Representation of Classification linked rule.
 */
export interface ClassificationLinkedRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "ClassificationLinked";
  /**
   * Classification id to link with.
   */
  classificationId: string;
  /** Specifies whether is directly linked or not. */
  directLinkOnly?: boolean;
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
