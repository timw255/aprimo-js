import { ExecutionTime } from "./ExecutionTime";

/**
 * Representation of Create Renditions rule action.
 */
export interface CreateRenditionsRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "CreateRenditions";
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
  /**
   * Collection of rendition preset names to use.
   */
  renditionPresets: string[];
}
