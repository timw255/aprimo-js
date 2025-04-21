import { ExecutionTime } from "./ExecutionTime";

export type WatermarkType = "None" | "UseSetting" | "UseSpecified";

export interface ApplyWatermarkOnMasterFileRuleAction {
  actionType: "ApplyWatermarkOnMasterFile";
  executionTime?: ExecutionTime;
  index?: number;
  watermarkId: string;
  watermarkType: WatermarkType;
}
