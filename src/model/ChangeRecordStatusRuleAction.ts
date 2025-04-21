import { ExecutionTime } from "./ExecutionTime";

export interface ChangeRecordStatusRuleAction {
  actionType: "ChangeRecordStatus";
  executionTime?: ExecutionTime;
  index?: number;
  status: string;
}
