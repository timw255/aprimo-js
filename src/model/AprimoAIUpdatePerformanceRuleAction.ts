import { ExecutionTime } from "./ExecutionTime";

/**
 * Updates the performance of the custom tags. Should only be used with a condition on
 * update of the AprimoAI_Custom_Tags field.
 */
export interface AprimoAIUpdatePerformanceRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "AprimoAIUpdatePerformance";
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
}
