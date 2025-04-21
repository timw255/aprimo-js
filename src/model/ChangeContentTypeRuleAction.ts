import { ExecutionTime } from "./ExecutionTime";

export interface ChangeContentTypeRuleAction {
  actionType: "ChangeContentType";
  contentType: string;
  executionTime?: ExecutionTime;
  index?: number;
}
