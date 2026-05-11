import { ExecutionTime } from "./ExecutionTime";

/**
 * Change Content Type rule action resource.
 */
export interface ChangeContentTypeRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "ChangeContentType";
  /**
   * Specify the name of the Content type.
   */
  contentType: string;
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
}
