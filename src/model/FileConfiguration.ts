export interface FileConfiguration {
  crawlLevelFieldId: string;
  crawlLevelOption: "Fixed" | "Field";
  crawlLevelValue: number;
  maximumNumberOfPages: number;
  smartAgentId: number;
  urlFieldId: string;
}
