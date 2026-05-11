/**
 * Representation of Content Type Set To rule condition (matched to spec schema `Contenttypechangedtorulecondition`,
 * discriminator value `contenttypesetto`).
 * (Spec description text reads "Representation of Object Changed rule condition" — likely a copy-paste in the spec.)
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
