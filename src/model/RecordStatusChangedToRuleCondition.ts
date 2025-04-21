export interface RecordStatusChangedToRuleCondition {
  conditionType: "RecordStatusSetTo";
  status: string;
  index?: number;
}
