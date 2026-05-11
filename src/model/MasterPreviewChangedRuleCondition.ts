/**
 * Representation of record master preview changed rule condition.
 */
export interface MasterPreviewChangedRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "MasterPreviewChanged";
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
