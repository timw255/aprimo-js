/**
 * Representation of Content Type Changed rule condition.
 * (Spec description text reads "Representation of Object Changed rule condition" — likely a copy-paste in the spec.)
 */
export interface ContentTypeChangedRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "ContentTypeChanged";
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
