/**
 * Representation of Currently logged on user rule.
 */
export interface CurrentlyLoggedOnUserRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "CurrentlyLoggedOnUser";
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
  /**
   * Whether the user triggering the rule matches the specified user or not.
   */
  isUser: boolean;
  /**
   * User's id.
   */
  userId: string;
}
