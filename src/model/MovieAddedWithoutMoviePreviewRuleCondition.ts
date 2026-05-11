/**
 * Representation of Movie Added Without Movie Preview rule condition.
 */
export interface MovieAddedWithoutMoviePreviewRuleCondition {
  /**
   * Gets the data type of this rule condition.
   */
  conditionType: "MovieAddedWithoutMoviePreview";
  /** Index of a rule condition in collection. Format: int32. */
  index?: number;
  /**
   * Extension of movie without preview.
   */
  moviePreviewExtension: string;
}
