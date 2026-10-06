import { ExecutionTime } from "./ExecutionTime";

/**
 * Representation of Run Text Match rule action.
 */
export interface RunTextMatchRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "RunTextMatch";
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
}
