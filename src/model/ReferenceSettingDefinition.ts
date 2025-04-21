import { ApiLink } from "./ApiLink";
import { Label } from "./Label";
import { User } from "./User";

export interface ReferenceSettingDefinition {
  allowSystemSetting: boolean;
  allowUserSetting: boolean;
  categoryId: string;
  createdOn: string;
  dataType: string;
  defaultValue: string;
  helpUrl: string;
  id: string;
  labels: Label[];
  modifiedOn: string;
  name: string;
  roleRequiredForChange: string;
  tag: string;
  userGroupSettingMode: string;
  _links: ReferenceSettingDefinitionLinks;
  _embedded?: {
    [K in Exclude<
      keyof ReferenceSettingDefinitionLinks,
      "self"
    >]?: ReferenceSettingDefinitionLinks[K] extends ApiLink<infer R>
      ? R
      : never;
  };
}

export interface ReferenceSettingDefinitionLinks {
  self: ApiLink;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
