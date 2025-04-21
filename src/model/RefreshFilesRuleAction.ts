import { ExecutionTime } from "./ExecutionTime";

export interface RefreshFilesRuleAction {
  actionType: "RefreshFiles";
  executionTime?: ExecutionTime;
  index?: number;
}
