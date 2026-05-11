import { ExecutionTime } from "./ExecutionTime";

/**
 * Representation of Refresh Files rule action.
 */
export interface RefreshFilesRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "RefreshFiles";
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
}
