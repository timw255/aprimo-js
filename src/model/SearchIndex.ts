/**
 * Status of the tenant's search index, as reported by `search.getIndexStatus()`.
 */
export interface SearchIndex {
  /** Number of classifications currently present in the index. Format: int32. */
  indexedClassifications: number;
  /** Number of records currently present in the index. Format: int32. */
  indexedRecords: number;
  /** Datetime of the most recent change picked up by the index, in UTC time. */
  lastChangeDateTime: string;
  /** Identifier of the most recent change picked up by the index. Format: int64. */
  lastChangeId: number;
  /** Datetime the index was last fully rebuilt, in UTC time. */
  lastIndexRebuild: string;
  /** Number of changes not yet reflected in the index. Format: int32. */
  pendingChanges: number;
  /** Indicates whether a full rebuild is required. */
  rebuildRequired: boolean;
  /** Indicates whether a full rebuild is already scheduled. */
  rebuildScheduled: boolean;
}
