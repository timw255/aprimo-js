import { ExecutionTime } from "./ExecutionTime";

export interface ScheduleResaveOfRecordRuleAction {
  actionType: "ScheduleResaveOfRecord";
  executionTime?: ExecutionTime;
  fieldDefinitionId: string;
  index?: number;
}
