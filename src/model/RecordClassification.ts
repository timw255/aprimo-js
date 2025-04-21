import { ApiLink } from "./ApiLink";
import { Classification } from "./Classification";

export interface RecordClassification {
  id: string;
  isManual: boolean;
  sortIndex: number;
  _links: RecordClassificationLinks;
  _embedded?: {
    [K in Exclude<
      keyof RecordClassificationLinks,
      "self"
    >]?: RecordClassificationLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface RecordClassificationLinks {
  self: ApiLink;
  target: ApiLink<Classification>;
}
