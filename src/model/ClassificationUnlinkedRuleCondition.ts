export interface ClassificationUnlinkedRuleCondition {
  conditionType: "ClassificationUnlinked";
  classificationId: string;
  directLinkOnly?: boolean;
  index?: number;
}
