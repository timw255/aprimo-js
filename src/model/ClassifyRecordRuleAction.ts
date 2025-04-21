import { ExecutionTime } from "./ExecutionTime";

export type ClassificationIdentifierType = "NamePath" | "Identifier";

export type ClassificationGettingType = "Specified" | "CalculatedByReference";

export interface ClassifyRecordRuleAction {
  actionType: "ClassifyRecord";
  classificationId?: string;
  executionTime?: ExecutionTime;
  gettingType: ClassificationGettingType;
  identifierType?: ClassificationIdentifierType;
  index?: number;
  reference?: string;
}
