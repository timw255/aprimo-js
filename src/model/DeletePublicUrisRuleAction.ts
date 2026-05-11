import { ExecutionTime } from "./ExecutionTime";
import { PublicUriPreset } from "./PublicUriPreset";

/**
 * Representation of Delete Public Uris rule action.
 */
export interface DeletePublicUrisRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "DeletePublicLinks";
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
  /** Collection of presets to use. */
  presets: PublicUriPreset[];
}
