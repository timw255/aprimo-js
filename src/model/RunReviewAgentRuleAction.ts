import { DelayedExecutionTime } from "./ExecutionTime";

/**
 * Which review agent to run. The API requires exactly one of these —
 * sending neither, or both, fails with "An invalid value was specified for
 * BuiltInAgentId".
 */
export type ReviewAgentSelection =
  | { builtInAgentId: string; contentCoachId?: never }
  | { contentCoachId: number; builtInAgentId?: never };

/**
 * Representation of Run Review Agent rule action. See
 * {@link ReviewAgentSelection} for the agent fields.
 */
export type RunReviewAgentRuleAction = {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "RunReviewAgent";
  /** Gets the execution time of the rule action. */
  executionTime?: DelayedExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
} & ReviewAgentSelection;
