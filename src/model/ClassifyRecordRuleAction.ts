import { ExecutionTime } from "./ExecutionTime";

/**
 * What is given as identification for the classification, when GettingType is "CalculatedByReference".
 */
export type ClassificationIdentifierType = "NamePath" | "Identifier";

/**
 * Controls how the classification is specified: either with a specific Id (Specified) or as a result
 * of a reference (CalculatedByReference).
 */
export type ClassificationGettingType = "Specified" | "CalculatedByReference";

/**
 * Link target with the classification.
 */
export interface ClassifyRecordRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "ClassifyRecord";
  /** Specify the Id of the classification, in case GettingType is set to "Specified". */
  classificationId?: string;
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /**
   * Controls how the classification is specified: either with a specific Id (Specified) or as a result of a reference (CalculatedByReference).
   */
  gettingType: ClassificationGettingType;
  /** Specify what is given as identification for the classification, in case GettingType is set to "CalculatedByReference". Possible values are Identifier or NamePath. */
  identifierType?: ClassificationIdentifierType;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
  /** A reference that results in a classification Id or name path, depending on the value of IdentifierType. */
  reference?: string;
}
