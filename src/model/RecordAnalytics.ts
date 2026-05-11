import { ApiLink } from "./ApiLink";

/**
 * Provides analytics data about the Record.
 */
export interface RecordAnalytics {
  /** The running total of downloads of the record. Format: int64. */
  downloads: number;
  /** The running total of views of the record. Format: int64. */
  views: number;
  _links: RecordAnalyticsLinks;
}

export interface RecordAnalyticsLinks {
  self: ApiLink;
}
