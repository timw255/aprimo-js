import { ExecutionTime } from "./ExecutionTime";

/**
 * Watermark type to apply.
 */
export type WatermarkType = "None" | "UseSetting" | "UseSpecified";

/**
 * Representation of ApplyWatermarkOnMasterFile rule action.
 */
export interface ApplyWatermarkOnMasterFileRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "ApplyWatermarkOnMasterFile";
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
  /**
   * Watermark ID to apply.
   */
  watermarkId: string;
  /**
   * Watermark type to apply.
   */
  watermarkType: WatermarkType;
}
