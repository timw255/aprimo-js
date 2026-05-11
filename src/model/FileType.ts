import { ApiLink } from "./ApiLink";
import { FileTypeAction } from "./FileTypeAction";
import { Image } from "./Image";
import { Label } from "./Label";
import { RegisteredField } from "./RegisteredField";
import { RegisteredFieldGroup } from "./RegisteredFieldGroup";
import { User } from "./User";

/**
 * Preview output format for a file type.
 */
export type PreviewFormat = "Jpg" | "Png";

/**
 * Representation of a specific version of a File.
 */
export interface FileType {
  allowOrderResizeSource: boolean;
  /** Collection of catalog actions available for this file type. */
  catalogActions: FileTypeAction[];
  /** The creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** Gets or sets the engine format. */
  engineFormat: string;
  /** Gets or sets the extension of the file type. */
  extension: string;
  icon: string;
  /** The unique identifier (GUID) of this file type. */
  id: string;
  /** Whether this file type is catalogable. */
  isCatalogable: boolean;
  keepDocumentDimensions: boolean;
  /** Gets or sets the kind of the file type. */
  kind: string;
  /** Collection of localized labels for this file type. */
  labels: Label[];
  /** Collection of media engines configured for this file type. */
  mediaEngines: string[];
  /** Gets or sets the mime type of the file type. */
  mimeType: string;
  /** The last modification datetime in UTC time. Format: date-time. */
  modifiedOn: string;
  /** Gets or sets the name of the file type. */
  name: string;
  /** Whether this is the preferred extension. */
  preferredExtension: boolean;
  /** Gets or sets the preview format. Enum: "Jpg" | "Png". */
  previewFormat: PreviewFormat;
  /** Whether the preview must keep the original dimensions. */
  previewKeepDimensions: boolean;
  /** Collection of preview player identifiers for this file type. */
  previewPlayers: string[];
  /** Whether a preview is required. */
  previewRequired: boolean;
  /** Collection of registered field groups for this file type. */
  registeredFieldGroups: RegisteredFieldGroup[];
  /** Collection of registered fields for this file type. */
  registeredFields: RegisteredField[];
  /** Whether files of this type can be resized. */
  supportAssetResize: boolean;
  /** Whether files of this type can be watermarked. */
  supportAssetWatermark: boolean;
  /**
   * Custom XML tag data for this object. An empty string is automatically converted to null.
   * Not returned by default — request with header `select-filetype: Tag`.
   */
  tag: string;
  thumbnail: string;
  _links: FileTypeLinks;
  _embedded?: {
    [K in Exclude<
      keyof FileTypeLinks,
      "self"
    >]?: FileTypeLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL `_links` for {@link FileType}.
 */
export interface FileTypeLinks {
  self: ApiLink;
  icon: ApiLink<Image>;
  thumbnail: ApiLink<Image>;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}

/**
 * Embedded relation names available for {@link FileType}.
 */
export type FileTypeRelations =
  | "icon"
  | "thumbnail"
  | "modifiedby"
  | "createdby";
