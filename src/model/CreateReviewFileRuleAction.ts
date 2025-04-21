import { ExecutionTime } from "./ExecutionTime";

export interface CreateReviewFileRuleAction {
  actionType: "CreateReviewFile";
  executionTime?: ExecutionTime;
  index?: number;
}
