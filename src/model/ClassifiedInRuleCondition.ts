/**
 * Representation of Classified In rule.
 */
export interface ClassifiedInRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "ClassifiedIn";
  /**
   * Classification id.
   */
  classificationId: string;
  /** Specifies whether is directly linked or not. */
  directLinkOnly?: boolean;
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
