import { ExecutionTime } from "./ExecutionTime";

/**
 * Which multilingual fields the translation agent processes.
 */
export type TranslationAgentFieldScope =
  | "OnlyChangedFields"
  | "AllSelectedFields";

/**
 * Representation of Run Translation Agent rule action.
 */
export interface RunTranslationAgentRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "RunTranslationAgent";
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /** Ids of the multilingual field definitions to translate. */
  fieldDefinitionIds?: (string | null)[];
  /** Whether to translate only changed fields, or all selected ones. */
  fieldScope?: TranslationAgentFieldScope;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
}
