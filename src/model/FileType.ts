import { ApiLink } from "./ApiLink";
import { FileTypeAction } from "./FileTypeAction";
import { Image } from "./Image";
import { Label } from "./Label";
import { RegisteredField } from "./RegisteredField";
import { RegisteredFieldGroup } from "./RegisteredFieldGroup";
import { User } from "./User";

export type PreviewFormat = "Jpg" | "Png";

export interface FileType {
  allowOrderResizeSource: boolean;
  catalogActions: FileTypeAction[];
  createdOn: string;
  engineFormat: string;
  extension: string;
  icon: string;
  id: string;
  isCatalogable: boolean;
  keepDocumentDimensions: boolean;
  kind: string;
  labels: Label[];
  mediaEngines: string[];
  mimeType: string;
  modifiedOn: string;
  name: string;
  preferredExtension: boolean;
  previewFormat: PreviewFormat;
  previewKeepDimensions: boolean;
  previewRenderWebControls: string[];
  previewRequired: boolean;
  registeredFieldGroups: RegisteredFieldGroup[];
  registeredFields: RegisteredField[];
  supportAssetResize: boolean;
  supportAssetWatermark: boolean;
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

export interface FileTypeLinks {
  self: ApiLink;
  icon: ApiLink<Image>;
  thumbnail: ApiLink<Image>;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}

export type FileTypeRelations =
  | "icon"
  | "thumbnail"
  | "modifiedby"
  | "createdby";
