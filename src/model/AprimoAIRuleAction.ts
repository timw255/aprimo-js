import { DelayedExecutionTime } from "./ExecutionTime";

/**
 * A single Aprimo AI feature. `options` carries one or more of these.
 */
export type AprimoAIOption =
  | "None"
  | "SmartTags"
  | "Faces"
  | "CustomSmartTags"
  | "Text"
  | "Transcripts";

/**
 * One or more {@link AprimoAIOption} values. The API accepts a single value or
 * a comma-separated list (`"SmartTags,Faces"`) and returns it joined with
 * `", "` — so a read can produce a value that is not a single option.
 */
export type AprimoAIOptions = AprimoAIOption | (string & {});

/**
 * Representation of Aprimo AI rule action.
 */
export interface AprimoAIRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "AprimoAI";
  /** Gets the execution time of the rule action. */
  executionTime?: DelayedExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
  /**
   * Which Aprimo AI features to run — one option, or several comma-separated.
   */
  options: AprimoAIOptions;
}
