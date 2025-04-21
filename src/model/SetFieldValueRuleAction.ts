import { ExecutionTime } from "./ExecutionTime";

export interface SetFieldValueRuleAction {
  actionType: "SetFieldValue";
  executionTime?: ExecutionTime;
  fieldDefinitionId: string;
  reference: string;
  index?: number;
}
