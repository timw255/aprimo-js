import { ApiLink } from "./ApiLink";
import { Label } from "./Label";
import { User } from "./User";

export interface XmlSettingDefinition {
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
  schema: string;
  tag: string;
  userGroupSettingMode: string;
  _links: XmlSettingDefinitionLinks;
  _embedded?: {
    [K in Exclude<
      keyof XmlSettingDefinitionLinks,
      "self"
    >]?: XmlSettingDefinitionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface XmlSettingDefinitionLinks {
  self: ApiLink;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
