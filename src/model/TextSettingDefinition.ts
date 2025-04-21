import { ApiLink } from "./ApiLink";
import { Label } from "./Label";
import { User } from "./User";

export interface TextSettingDefinition {
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
  regularExpression: string;
  roleRequiredForChange: string;
  tag: string;
  userGroupSettingMode: string;
  _links: TextSettingDefinitionLinks;
  _embedded?: {
    [K in Exclude<
      keyof TextSettingDefinitionLinks,
      "self"
    >]?: TextSettingDefinitionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface TextSettingDefinitionLinks {
  self: ApiLink;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
