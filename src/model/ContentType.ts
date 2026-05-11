import { ApiLink } from "./ApiLink";
import { ContentTypeInheritableFieldCollection } from "./ContentTypeInheritableFieldCollection";
import { FileConfiguration } from "./FileConfiguration";
import { Label } from "./Label";
import { TitleConfiguration } from "./TitleConfiguration";
import { User } from "./User";

/**
 * How files are handled for this content type:
 * - `UploadFile`: Standard file upload
 * - `NoFile`: Metadata-only records without files
 * - `CreateFromUrl`: Generate PDF from a URL (website capture)
 * - `CreateFromSmartAgent`: Generate content using a smart agent
 */
export type FileMode =
  | "UploadFile"
  | "NoFile"
  | "CreateFromUrl"
  | "CreateFromSmartAgent";

/**
 * How field inheritance works for records of this type.
 */
export type InheritanceConfiguration = "Custom" | "None";

/**
 * Representation of a content type that defines the structure and behavior of records.
 *
 * Pass an {@link Expander} chain `for<ContentType>("ContentType")` to populate
 * related resources under `_embedded`. Expandable keys: `parent`, `modifiedby`,
 * `createdby`.
 */
export interface ContentType {
  /** The creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** File extensions registered on this content type. */
  defaultFileExtensions: string[];
  /** Configuration for URL-based or SmartAgent-based file generation. */
  fileConfiguration: FileConfiguration | null;
  /** How files are handled for this content type. */
  fileMode: FileMode;
  /** The unique identifier (GUID) of this content type. */
  id: string;
  /** Collection of fields that can be inherited by child records. */
  inheritableFields: ContentTypeInheritableFieldCollection;
  /** How field inheritance works for records of this type. */
  inheritanceConfiguration: InheritanceConfiguration;
  /** The ID of the record link field used for inheritance. */
  inheritanceFieldId: string;
  /** Whether this is a manually created content type. */
  isManual: boolean;
  /**
   * Whether this content type is for metadata-only records without files.
   */
  isNoFile: boolean;
  /** Localized display labels for this content type. */
  labels: Label[];
  /** The last modification datetime in UTC time. Format: date-time. */
  modifiedOn: string;
  /** The internal name of this content type. */
  name: string;
  /** The ID of the parent content type. Null for root content types. */
  parentId: string | null;
  /** Description explaining the purpose of this content type. */
  purpose: string;
  /** Collection of fields registered on this content type. */
  registeredFields: { fieldId: string }[];
  /** Collection of field groups registered on this content type. */
  registeredFieldGroups: object[];
  /** Configuration for how record display titles are computed. */
  titleConfiguration: TitleConfiguration;
  _links: ContentTypeLinks;
  _embedded?: {
    [K in Exclude<
      keyof ContentTypeLinks,
      "self"
    >]?: ContentTypeLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL `_links` for {@link ContentType}.
 */
export interface ContentTypeLinks {
  self: ApiLink;
  parent: ApiLink<ContentType>;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
