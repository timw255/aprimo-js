import { HelpText } from "./HelpText";
import { Label } from "./Label";
import { ApiLink } from "./ApiLink";
import { User } from "./User";

export type LanguageMode = "Single" | "Multiple";

export type Scope =
  | "RecordContentGlobal"
  | "RecordContentClassDependent"
  | "RecordContentFloating"
  | "ClassificationProfileClassDependent"
  | "UserGlobal"
  | "FileFileTypeDependent"
  | "FileFloating"
  | "IndexerTaskGlobal"
  | "FileGlobal"
  | "ClassificationProfileFloating"
  | "RecordContentContentTypeDependent";

export type ValidationTrigger = "None" | "WhenNeeded" | "Always";

export type StorageMode =
  | "None"
  | "NonEmptyValues"
  | "AllValues"
  | "LogChanges";

export type ScopeCategory =
  | "Record"
  | "File"
  | "Classification"
  | "User"
  | "IndexerTask"
  | "MetadataTemplate";

export type ResetToDefaultTrigger =
  | "None"
  | "OnNewField"
  | "OnLoad"
  | "OnSave"
  | "OnAnyFileChange"
  | "OnReclassifyRecord"
  | "OnAnyChange"
  | "OnFieldChange"
  | "OnMasterFileChange"
  | "OnCurrentFileChange"
  | "OnFieldDefinitionChanged"
  | "OnDuplicateRecord"
  | "OnRecordStatusChange";

export interface BaseFieldDefinition {
  aiEnabled?: boolean;
  createdOn: string;
  modifiedOn: string;
  dataType: string;
  defaultValue: string;
  enabledLanguages: string[];
  helpText: string;
  helpTexts: HelpText[];
  id: string;
  indexed: boolean;
  inlineStyle: string;
  isReadOnly: boolean;
  isRequired: boolean;
  isUniqueIdentifier: boolean;
  label: string;
  labels: Label[];
  languageMode: LanguageMode;
  memberships: string[];
  name: string;
  resetToDefaultFields: string[];
  resetToDefaultTriggers: ResetToDefaultTrigger[];
  scope: Scope;
  scopeCategory: ScopeCategory;
  searchIndexRebuildRequired: boolean;
  sortIndex: number;
  storageMode: StorageMode;
  tag: string;
  validation: string;
  validationErrorMessage: string;
  validationTrigger: ValidationTrigger;
  _links: BaseFieldDefinitionLinks;
  _embedded?: {
    [K in Exclude<
      keyof BaseFieldDefinitionLinks,
      "self"
    >]?: BaseFieldDefinitionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface BaseFieldDefinitionLinks {
  self: ApiLink;
  createdby: ApiLink<User>;
  modifiedby: ApiLink<User>;
}
