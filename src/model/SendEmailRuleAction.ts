import { ExecutionTime } from "./ExecutionTime";

/**
 * Target type selected by the user.
 */
export type SendEmailTargetType = "SubscribersList" | "Reference";

/**
 * Representation of Send email rule action.
 */
export interface SendEmailRuleAction {
  /**
   * Gets the data type of this rule action.
   */
  actionType: "SendEmail";
  /** Gets the execution time of the rule action. */
  executionTime?: ExecutionTime;
  /** Index of a rule action in collection. Format: int32. */
  index?: number;
  /** Reference that contains mail template for user's recipients. */
  reference?: string;
  /** Subscribers List that contains mail template for subscriber's recipients. */
  subscribersList?: string;
  /**
   * Target type selected by the user.
   */
  targetType: SendEmailTargetType;
}
