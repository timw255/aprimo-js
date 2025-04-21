import { ApiLink } from "./ApiLink";

export interface UniqueKeyIndex {
  hasDuplicates: boolean;
  indexBuildRequired: boolean;
  isReindexing: boolean;
  lastTimeIndexed: string;
  totalProcessedClassifications: number;
  totalProcessedRecords: number;
  _links: UniqueKeyIndexLinks;
}

export interface UniqueKeyIndexLinks {
  self: ApiLink;
}
