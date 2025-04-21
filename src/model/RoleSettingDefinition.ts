import { ApiLink } from "./ApiLink";
import { Label } from "./Label";
import { User } from "./User";

export interface RoleSettingDefinition {
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
  _links: RoleSettingDefinitionLinks;
  _embedded?: {
    [K in Exclude<
      keyof RoleSettingDefinitionLinks,
      "self"
    >]?: RoleSettingDefinitionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface RoleSettingDefinitionLinks {
  self: ApiLink;
  createdby: ApiLink<User>;
  modifiedby: ApiLink<User>;
}
