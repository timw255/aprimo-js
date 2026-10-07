import { ExecutionTime } from "./ExecutionTime";

/**
 * Representation of Create an Activity rule action. `activityDuration` and
 * `activityTypeId` are both required.
 */
export interface CreateActivityRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "CreateActivity";
  /**
   * Admin of the activity. Accepts a plain user id, or a reference that
   * resolves to one.
   */
  activityAdmin?: string;
  /** Duration of the activity, in minutes. Format: int32. */
  activityDuration: number;
  /**
   * Owner of the activity. Accepts a plain user id, or a reference that
   * resolves to one.
   */
  activityOwner?: string;
  /** Id of the activity type. Format: int32. */
  activityTypeId: number;
  /** Id of the digital asset type. Format: int32. */
  digitalAssetType?: number | null;
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
}
