import { DelayedExecutionTime } from "./ExecutionTime";

/**
 * Representation of Video Summary rule action.
 */
export interface VideoSummaryRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "VideoSummary";
  /** Gets the execution time of the rule action. */
  executionTime?: DelayedExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
}
