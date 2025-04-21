export interface CurrentlyLoggedOnUserRuleCondition {
  conditionType: "CurrentlyLoggedOnUser";
  index?: number;
  isUser: boolean;
  userId: string;
}
