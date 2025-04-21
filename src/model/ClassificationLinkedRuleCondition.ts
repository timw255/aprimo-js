export interface ClassificationLinkedRuleCondition {
  conditionType: "ClassificationLinked";
  classificationId: string;
  directLinkOnly?: boolean;
  index?: number;
}
