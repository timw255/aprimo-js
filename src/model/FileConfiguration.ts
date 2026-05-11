/**
 * Configuration for URL-based or SmartAgent-based file generation.
 */
export interface FileConfiguration {
  /**
   * ID of field containing crawl depth. Used when `crawlLevelOption` is `Field`. AprimoId.
   */
  crawlLevelFieldId: string;
  /**
   * How crawl depth is determined:
   * - `Fixed`: Use the value in `crawlLevelValue`
   * - `Field`: Use the value from the field specified by `crawlLevelFieldId`
   */
  crawlLevelOption: "Fixed" | "Field";
  /**
   * Fixed crawl depth value. Used when `crawlLevelOption` is `Fixed`. Format: int32.
   */
  crawlLevelValue: number;
  /**
   * Maximum number of pages to include in the generated PDF. Format: int32.
   */
  maximumNumberOfPages: number;
  /**
   * ID of the smart agent to use for content generation. Format: int32.
   */
  smartAgentId: number;
  /**
   * ID of the field containing the URL to capture. AprimoId.
   */
  urlFieldId: string;
}
