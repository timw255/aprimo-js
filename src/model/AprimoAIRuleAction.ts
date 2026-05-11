import { ExecutionTime } from "./ExecutionTime";

/**
 * Controls which Aprimo AI features to run.
 */
export type AprimoAIOption =
  | "None"
  | "SmartTags"
  | "Faces"
  | "CustomSmartTags"
  | "Text"
  | "Transcripts";

/**
 * Representation of Aprimo AI rule action.
 */
export interface AprimoAIRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "AprimoAI";
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
  /**
   * Controls which Aprimo AI features to run.
   */
  options: AprimoAIOption;
}
