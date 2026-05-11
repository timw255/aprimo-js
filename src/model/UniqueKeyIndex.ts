import { ApiLink } from "./ApiLink";

/**
 * Representation of a search index (Unique Key Index variant tracking
 * uniqueness across classifications and records).
 */
export interface UniqueKeyIndex {
  /** Are duplicates present?. */
  hasDuplicates: boolean;
  /** Is a unique key index rebuild required?. */
  indexBuildRequired: boolean;
  /** Is the reindexing process running?. */
  isReindexing: boolean;
  /** The last time an index happened. Format: date-time. */
  lastTimeIndexed: string;
  /** Total amount of processed classifications. Format: int32. */
  totalProcessedClassifications: number;
  /** Total amount of processed records. Format: int32. */
  totalProcessedRecords: number;
  _links: UniqueKeyIndexLinks;
}

export interface UniqueKeyIndexLinks {
  self: ApiLink;
}
