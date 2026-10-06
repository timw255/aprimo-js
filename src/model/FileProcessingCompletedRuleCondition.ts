/**
 * Representation of File Processing Completed rule condition. Surfaced in the
 * rule builder as "File ready for use".
 */
export interface FileProcessingCompletedRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "FileProcessingCompleted";
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
