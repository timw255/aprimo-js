import { ApiLink } from "./ApiLink";
import { Label } from "./Label";
import { User } from "./User";

export interface SettingDefinition {
  allowSystemSetting: boolean;
  allowUserSetting: boolean;
  categoryId: string;
  createdOn: string;
  dataType: string;
  helpUrl: string;
  id: string;
  labels: Label[];
  modifiedOn: string;
  name: string;
  roleRequiredForChange: string;
  tag: string;
  userGroupSettingMode: string;
  _links: SettingDefinitionLinks;
  _embedded?: {
    [K in Exclude<
      keyof SettingDefinitionLinks,
      "self"
    >]?: SettingDefinitionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface SettingDefinitionLinks {
  self: ApiLink;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
