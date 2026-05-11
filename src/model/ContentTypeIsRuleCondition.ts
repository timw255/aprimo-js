/**
 * Representation of content type is rule condition.
 */
export interface ContentTypeIsRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "ContentTypeIs";
  /**
   * ContentType Name.
   */
  contentType: string;
  /** Specifies whether is directly linked or not. */
  directLinkOnly?: boolean;
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
