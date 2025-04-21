import { ExecutionTime } from "./ExecutionTime";

export interface AprimoAIUpdatePerformanceRuleAction {
  actionType: "AprimoAIUpdatePerformance";
  executionTime?: ExecutionTime;
  index?: number;
}
