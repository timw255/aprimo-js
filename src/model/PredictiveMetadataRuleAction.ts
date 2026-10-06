import { ExecutionTime } from "./ExecutionTime";

/**
 * Representation of Predict Metadata rule action.
 */
export interface PredictiveMetadataRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "PredictiveMetadata";
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
}
