import { ExecutionTime } from "./ExecutionTime";

/**
 * Representation of Resolve content type rule action.
 */
export interface ResolveContentTypeRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "ResolveContentType";
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
}
