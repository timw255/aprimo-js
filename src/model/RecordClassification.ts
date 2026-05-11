import { ApiLink } from "./ApiLink";
import { Classification } from "./Classification";

/**
 * Representation of a RecordClassification.
 */
export interface RecordClassification {
  /** Gets the Id of this classification. */
  id: string;
  /** Indicates if this classification is added manually or automatically through classification mappings. */
  isManual: boolean;
  /**
   * Gets the index of this recordclassification. This index indicates where
   * the corresponding record is sorted in the classification. Format: int32.
   */
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
