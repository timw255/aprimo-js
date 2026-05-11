import { ExecutionTime } from "./ExecutionTime";
import { PublicUriPreset } from "./PublicUriPreset";

/**
 * Representation of Create Public Uris rule action.
 */
export interface CreatePublicUrisRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "CreatePublicLinks";
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
  /** Collection of presets to use. */
  presets: PublicUriPreset[];
}
