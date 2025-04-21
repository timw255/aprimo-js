import { ApiLink } from "./ApiLink";
import { Label } from "./Label";
import { User } from "./User";

export interface DateTimeSettingDefinition {
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
  _links: DateTimeSettingDefinitionLinks;
  _embedded?: {
    [K in Exclude<
      keyof DateTimeSettingDefinitionLinks,
      "self"
    >]?: DateTimeSettingDefinitionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface DateTimeSettingDefinitionLinks {
  self: ApiLink;
  createdby: ApiLink<User>;
  modifiedby: ApiLink<User>;
}
