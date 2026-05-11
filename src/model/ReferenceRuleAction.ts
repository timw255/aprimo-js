import { ExecutionTime } from "./ExecutionTime";

/**
 * Representation of reference rule action.
 */
export interface ReferenceRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "Reference";
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
  /**
   * Reference to be executed.
   */
  reference: string;
}
