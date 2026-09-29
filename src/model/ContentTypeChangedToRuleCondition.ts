/**
 * Representation of Content Type Set To rule condition (discriminator value
 * `contenttypesetto`).
 */
export interface ContentTypeChangedToRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "ContentTypeSetTo";
  /**
   * ContentType Name.
   */
  contentType: string;
  /** Specifies whether is directly linked or not. */
  directLinkOnly?: boolean;
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
}
