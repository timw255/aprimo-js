/**
 * Representation of Multilingual Field Values Changed rule condition.
 */
export interface MultilingualFieldValuesChangedRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "MultilingualFieldValuesChanged";
  /** Ids of the multilingual field definitions to check. */
  fieldDefinitionIds?: (string | null)[];
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
