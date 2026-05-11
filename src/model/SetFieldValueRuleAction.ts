import { ExecutionTime } from "./ExecutionTime";

/**
 * Sets the value of the specified field to the result of the reference.
 */
export interface SetFieldValueRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "SetFieldValue";
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /**
   * The Id of the field whose value must be set.
   */
  fieldDefinitionId: string;
  /**
   * The reference whose result will be used as field value.
   */
  reference: string;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
}
