import { DelayedExecutionTime } from "./ExecutionTime";

/**
 * Representation of Create Smart Crops rule action.
 */
export interface CreatePresetCropsRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "CreatePresetCrops";
  /** Gets the execution time of the rule action. */
  executionTime?: DelayedExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
}
