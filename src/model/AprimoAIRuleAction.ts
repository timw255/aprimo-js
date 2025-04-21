import { ExecutionTime } from "./ExecutionTime";

export type AprimoAIOption =
  | "None"
  | "SmartTags"
  | "Faces"
  | "CustomSmartTags"
  | "Text"
  | "Transcripts";

export interface AprimoAIRuleAction {
  actionType: "AprimoAI";
  executionTime?: ExecutionTime;
  index?: number;
  options: AprimoAIOption;
}
