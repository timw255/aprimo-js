import { ExecutionTime } from "./ExecutionTime";

export type GettingType = "Specified" | "CalculatedByReference";
export type IdentifierType = "NamePath" | "Identifier";
export type UnlinkTarget = "Classification" | "ClassificationsDescendants";

export interface UnclassifyRecordRuleAction {
  actionType: "UnclassifyRecord";
  classificationId?: string;
  classificationIds?: string[];
  executionTime?: ExecutionTime;
  gettingType?: GettingType;
  identifierType?: IdentifierType;
  reference?: string;
  unlinkTarget?: UnlinkTarget;
  index?: number;
}
