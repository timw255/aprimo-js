import { ExecutionTime } from "./ExecutionTime";

export interface ReferenceRuleAction {
  actionType: "Reference";
  executionTime?: ExecutionTime;
  index?: number;
  reference: string;
}
