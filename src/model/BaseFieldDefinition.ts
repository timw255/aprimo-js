import { HelpText } from "./HelpText";
import { Label } from "./Label";
import { ApiLink } from "./ApiLink";
import { User } from "./User";

/**
 * How a field handles multiple languages: `Single` (one value shared across languages)
 * or `Multiple` (separate values per language).
 */
export type LanguageMode = "Single" | "Multiple";

/**
 * The scope determines where a field is available.
 *
 * - `RecordContentGlobal` — Available on all records
 * - `RecordContentClassDependent` — Available on records with specific classifications
 * - `RecordContentFloating` — Dynamically attached to records
 * - `RecordContentContentTypeDependent` — Available on records with specific content types
 * - `ClassificationProfileClassDependent` — Available on specific classifications
 * - `UserGlobal` — Available on all users
 * - `FileFileTypeDependent` — Available on files of specific file types
 * - `FileFloating` — Dynamically attached to files
 * - `FileGlobal` — Available on all files
 * - `IndexerTaskGlobal` — Indexer task scope
 * - `ClassificationProfileFloating` — Floating classification profile scope
 */
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

/**
 * When validation is performed for a field.
 */
export type ValidationTrigger = "None" | "WhenNeeded" | "Always";

/**
 * Storage mode for a field's value history.
 */
export type StorageMode =
  | "None"
  | "NonEmptyValues"
  | "AllValues"
  | "LogChanges";

/**
 * Top-level scope category for a field definition.
 */
export type ScopeCategory =
  | "Record"
  | "File"
  | "Classification"
  | "User"
  | "IndexerTask"
  | "MetadataTemplate";

/**
 * The data type of a field. Discriminator value for the {@link import("./FieldDefinition").FieldDefinition}
 * and {@link import("./Field").Field} unions.
 */
export type DataType =
  | "None"
  | "SingleLineText"
  | "MultiLineText"
  | "Numeric"
  | "DateTime"
  | "Date"
  | "Time"
  | "OptionList"
  | "Duration"
  | "UserList"
  | "UserGroupList"
  | "Html"
  | "Json"
  | "ClassificationList"
  | "RecordList"
  | "RecordLink"
  | "LanguageList"
  | "TextList"
  | "HyperlinkList";

/**
 * Events that trigger a field to reset to its default value.
 */
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

/**
 * Common base properties shared by every concrete `FieldDefinition` subtype.
 *
 * Pass an {@link Expander} chain `for<BaseFieldDefinition>("Fielddefinition")`
 * to populate related resources under `_embedded`. Expandable keys:
 * `createdby`, `modifiedby`.
 *
 * The OpenAPI spec does not declare a `BaseFieldDefinition` schema; it inlines
 * these properties into each concrete subtype.
 */
export interface BaseFieldDefinition {
  /**
   * Indicates whether to allow AI enhancement.
   */
  aiEnabled?: boolean;
  /** The creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** The last modification datetime in UTC time. Format: date-time. */
  modifiedOn: string;
  /**
   * The data type of this field. Discriminator for the {@link import("./FieldDefinition").FieldDefinition} union.
   */
  dataType: DataType;
  /** The default value for this field. */
  defaultValue: string;
  /** IDs of languages enabled for this field. */
  enabledLanguages: string[];
  /** Help text displayed in the default language. */
  helpText: string;
  /** Collection of localized help texts for this field. */
  helpTexts: HelpText[];
  /** The AI Prediction hint for this field. Not returned on every subtype. */
  hints?: string | null;
  /** The unique identifier (GUID) of this field definition. */
  id: string;
  /** Whether searching on this field is enabled. */
  indexed: boolean;
  /** Custom CSS style applied to this field in the UI. */
  inlineStyle: string;
  /** Whether this field is read-only and cannot be edited by users. */
  isReadOnly: boolean;
  /** Whether this field must have a value before saving. */
  isRequired: boolean;
  /** Whether this field serves as a unique identifier for records. */
  isUniqueIdentifier: boolean;
  /** The display label for this field in the default language. */
  label: string;
  /** Collection of localized labels for this field. */
  labels: Label[];
  /** How this field handles multiple languages. */
  languageMode: LanguageMode;
  /** IDs of field groups this field belongs to. */
  memberships: string[];
  /** Indicates whether the field can be predicted by the AI. Not returned on every subtype. */
  metadataPredictionEnabled?: boolean;
  /** The internal name for this field. */
  name: string;
  /** IDs of fields that trigger this field to reset to its default value. */
  resetToDefaultFields: string[];
  /** Events that trigger this field to reset to its default value. */
  resetToDefaultTriggers: ResetToDefaultTrigger[];
  /** The scope determines where this field is available. */
  scope: Scope;
  /** The scope category. */
  scopeCategory: ScopeCategory;
  /** Whether a search index rebuild is required. */
  searchIndexRebuildRequired: boolean;
  /** The sorting index of this field. Format: int32. */
  sortIndex: number;
  /** The storage mode of this field. */
  storageMode: StorageMode;
  /** A tag for this field containing extra information. */
  tag: string | null;
  /** The validation rule of this field. */
  validation: string;
  /** The error message displayed when validation fails. */
  validationErrorMessage: string;
  /** When validation runs. */
  validationTrigger: ValidationTrigger;
  _links: BaseFieldDefinitionLinks;
  _embedded?: {
    [K in Exclude<
      keyof BaseFieldDefinitionLinks,
      "self"
    >]?: BaseFieldDefinitionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL `_links` map for {@link BaseFieldDefinition}.
 */
export interface BaseFieldDefinitionLinks {
  /** Link to this field definition resource. */
  self: ApiLink;
  /** Link to the user who created this field definition. */
  createdby: ApiLink<User>;
  /** Link to the user who last modified this field definition. */
  modifiedby: ApiLink<User>;
}
