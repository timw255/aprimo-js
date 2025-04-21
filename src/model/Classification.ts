import { ApiLink } from "./ApiLink";
import { ClassificationCollection } from "./ClassificationCollection";
import { ClassificationDownloadPermissions } from "./ClassificationDownloadPermissions";
import { ClassificationPermissions } from "./ClassificationPermissions";
import { ClassificationUserPermissions } from "./ClassificationUserPermissions";
import { FieldCollection } from "./FieldCollection";
import { Image } from "./Image";
import { Label } from "./Label";
import { RegisteredField } from "./RegisteredField";
import { RegisteredFieldGroup } from "./RegisteredFieldGroup";
import { User } from "./User";

export interface Classification {
  id: string;
  identifier: string;
  name: string;
  namePath: string;
  labelPath: string;
  labels: Label[];
  createdOn: string;
  modifiedOn: string;
  isRoot: boolean;
  parentId?: string;
  hasChildren?: boolean;
  registeredFieldGroups: RegisteredFieldGroup[];
  registeredFields: RegisteredField[];
  sortIndex: number;
  sortOrder: string;
  disabledInDAMUI: boolean;
  tag: string;
  _links: ClassificationLinks;
  _embedded?: {
    [K in Exclude<
      keyof ClassificationLinks,
      "self"
    >]?: ClassificationLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface ClassificationLinks {
  self: ApiLink;
  parent: ApiLink<Classification>;
  ancestors: ApiLink;
  children: ApiLink<ClassificationCollection>;
  image: ApiLink<Image>;
  fields: ApiLink<FieldCollection>;
  recordpermissions: ApiLink<ClassificationPermissions>;
  downloadpermissions: ApiLink<ClassificationDownloadPermissions>;
  classificationtreepermissions: ApiLink<ClassificationPermissions>;
  slaveclassifications: ApiLink<ClassificationCollection>;
  followerclassifications: ApiLink<ClassificationCollection>;
  classificationuserpermission: ApiLink<ClassificationUserPermissions>;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
