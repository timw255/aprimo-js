export interface ContentTypeChangedToRuleCondition {
  conditionType: "ContentTypeSetTo";
  contentType: string;
  directLinkOnly?: boolean;
  index?: number;
}
