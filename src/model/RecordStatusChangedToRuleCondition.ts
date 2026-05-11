/**
 * Representation of record status set to rule condition (matched to spec schema
 * `Recordstatuschangedtorulecondition`, discriminator value `recordstatussetto`).
 */
export interface RecordStatusChangedToRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "RecordStatusSetTo";
  /**
   * Status.
   */
  status: string;
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
