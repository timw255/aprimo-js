import { ApiLink } from "./ApiLink";

/**
 * Representation of a search index.
 */
export interface SearchIndex {
  /** Provides a number of indexed classifications. Format: int64. */
  indexedClassifications: number;
  /** Provides a number of indexed records. Format: int64. */
  indexedRecords: number;
  /** Provides the last change date and time. Format: date-time. */
  lastChangeDateTime: string;
  /** Provides the last change ID. Format: int64. */
  lastChangeId: number;
  /** Provides a date and time when the last index built on. Format: date-time. */
  lastIndexRebuild: string;
  /** Provides a number of pending changes. Format: int32. */
  pendingChanges: number;
  /** Returns true if the search index needs to be rebuilt. */
  rebuildRequired: boolean;
  /** Returns true if the search is indexing. */
  rebuildScheduled: boolean;
  _links: SearchIndexLinks;
}

export interface SearchIndexLinks {
  self: ApiLink;
}
