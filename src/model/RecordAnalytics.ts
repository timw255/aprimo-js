import { ApiLink } from "./ApiLink";

export interface RecordAnalytics {
  downloads: number;
  views: number;
  _links: RecordAnalyticsLinks;
}

export interface RecordAnalyticsLinks {
  self: ApiLink;
}
