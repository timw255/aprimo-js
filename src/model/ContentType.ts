import { ApiLink } from "./ApiLink";
import { ContentTypeInheritableFieldCollection } from "./ContentTypeInheritableFieldCollection";
import { FileConfiguration } from "./FileConfiguration";
import { Label } from "./Label";
import { TitleConfiguration } from "./TitleConfiguration";
import { User } from "./User";

export type FileMode =
  | "UploadFile"
  | "NoFile"
  | "CreateFromUrl"
  | "CreateFromSmartAgent";

export type InheritanceConfiguration = "Custom" | "None";

export interface ContentType {
  createdOn: string;
  defaultFileExtensions: string[];
  fileConfiguration: FileConfiguration;
  fileMode: FileMode;
  id: string;
  inheritableFields: ContentTypeInheritableFieldCollection;
  inheritanceConfiguration: InheritanceConfiguration;
  inheritanceFieldId: string;
  isManual: boolean;
  isNoFile: boolean;
  labels: Label[];
  modifiedOn: string;
  name: string;
  parentId?: string;
  purpose: string;
  registeredFields: object[];
  titleConfiguration: TitleConfiguration;
  _links: ContentTypeLinks;
  _embedded?: {
    [K in Exclude<
      keyof ContentTypeLinks,
      "self"
    >]?: ContentTypeLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface ContentTypeLinks {
  self: ApiLink;
  parent: ApiLink<ContentType>;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
