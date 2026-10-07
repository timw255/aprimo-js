import { DelayedExecutionTime } from "./ExecutionTime";

/**
 * Representation of Create Review file rule action.
 */
export interface CreateReviewFileRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "CreateReviewFile";
  /** Gets the execution time of the rule action. */
  executionTime?: DelayedExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
}
