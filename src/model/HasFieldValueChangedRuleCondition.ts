export interface HasFieldValueChangedRuleCondition {
  conditionType: "HasFieldValueChanged";
  fieldDefinitionId: string;
  index?: number;
}
