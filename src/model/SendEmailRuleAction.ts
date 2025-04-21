import { ExecutionTime } from "./ExecutionTime";

export type SendEmailTargetType = "SubscribersList" | "Reference";

export interface SendEmailRuleAction {
  actionType: "SendEmail";
  executionTime?: ExecutionTime;
  index?: number;
  reference?: string;
  subscribersList?: string;
  targetType: SendEmailTargetType;
}
