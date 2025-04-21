import { ApiLink } from "./ApiLink";
import { Label } from "./Label";
import { User } from "./User";

export interface NumericSettingDefinition {
  allowSystemSetting: boolean;
  allowUserSetting: boolean;
  categoryId: string;
  createdOn: string;
  dataType: string;
  defaultValue: number;
  helpUrl: string;
  id: string;
  labels: Label[];
  modifiedOn: string;
  name: string;
  range: string;
  roleRequiredForChange: string;
  tag: string;
  userGroupSettingMode: string;
  _links: NumericSettingDefinitionLinks;
  _embedded?: {
    [K in Exclude<
      keyof NumericSettingDefinitionLinks,
      "self"
    >]?: NumericSettingDefinitionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface NumericSettingDefinitionLinks {
  self: ApiLink;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
