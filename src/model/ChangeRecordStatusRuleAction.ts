import { ExecutionTime } from "./ExecutionTime";

/**
 * Change Status rule action resource.
 */
export interface ChangeRecordStatusRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "ChangeRecordStatus";
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
  /**
   * Specify the Status.
   */
  status: string;
}
