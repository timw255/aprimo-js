import { ExecutionTime } from "./ExecutionTime";

export interface CreatePresetCropsRuleAction {
  actionType: "CreatePresetCrops";
  executionTime?: ExecutionTime;
  index?: number;
}
