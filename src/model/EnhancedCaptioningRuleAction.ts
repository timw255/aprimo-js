import { DelayedExecutionTime } from "./ExecutionTime";

/**
 * Representation of Enhanced Captioning rule action.
 */
export interface EnhancedCaptioningRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "EnhancedCaptioning";
  /** Gets the execution time of the rule action. */
  executionTime?: DelayedExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
}
