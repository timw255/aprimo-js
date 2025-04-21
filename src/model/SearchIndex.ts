import { ApiLink } from "./ApiLink";

export interface SearchIndex {
  indexedClassifications: number;
  indexedRecords: number;
  lastChangeDateTime: string;
  lastChangeId: number;
  lastIndexRebuild: string;
  pendingChanges: number;
  rebuildRequired: boolean;
  rebuildScheduled: boolean;
  _links: SearchIndexLinks;
}

export interface SearchIndexLinks {
  self: ApiLink;
}
