import { ExecutionTime } from "./ExecutionTime";

export interface CreateRenditionsRuleAction {
  actionType: "CreateRenditions";
  executionTime?: ExecutionTime;
  index?: number;
  renditionPresets: string[];
}
