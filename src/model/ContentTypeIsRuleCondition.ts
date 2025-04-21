export interface ContentTypeIsRuleCondition {
  conditionType: "ContentTypeIs";
  contentType: string;
  directLinkOnly?: boolean;
  index?: number;
}
