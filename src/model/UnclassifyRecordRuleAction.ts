import { ExecutionTime } from "./ExecutionTime";

/**
 * Controls how the classification is specified: either with a specific Id (Specified) or as a result
 * of a reference (CalculatedByReference).
 */
export type GettingType = "Specified" | "CalculatedByReference";

/**
 * What is given as identification for the classification, when GettingType is "CalculatedByReference".
 */
export type IdentifierType = "NamePath" | "Identifier";

/**
 * Specify which classifications will be unlinked.
 */
export type UnlinkTarget = "Classification" | "ClassificationsDescendants";

/**
 * Unlink target from the classification.
 */
export interface UnclassifyRecordRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "UnclassifyRecord";
  /** Specify the Id of the classification, in case GettingType is set to "Specified". In case ClassificationIds property is not null, current property is ignored. */
  classificationId?: string;
  /** IDs of classifications to use when GettingType is "Specified". If provided, ClassificationId is ignored. */
  classificationIds?: string[];
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /** Controls how the classification is specified: either with a specific Id (Specified) or as a result of a reference (CalculatedByReference). */
  gettingType?: GettingType;
  /** Specify what is given as identification for the classification, in case GettingType is set to "CalculatedByReference". Possible values are Identifier or NamePath. */
  identifierType?: IdentifierType;
  /** A reference that results in a classification Id or name path, depending on the value of IdentifierType. */
  reference?: string;
  /** Specify which classifications will be unlinked. */
  unlinkTarget?: UnlinkTarget;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
}
