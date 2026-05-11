import { ExecutionTime } from "./ExecutionTime";

/**
 * Representation of ScheduleResaveOfRecord rule action.
 */
export interface ScheduleResaveOfRecordRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "ScheduleResaveOfRecord";
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /**
   * Id of the datetime field containing the resave date.
   */
  fieldDefinitionId: string;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
}
