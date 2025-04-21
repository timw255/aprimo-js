import { ApiLink } from "./ApiLink";
import { Label } from "./Label";
import { User } from "./User";

export interface DefSchemaSettingDefinition {
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
  _links: DefSchemaSettingDefinitionLinks;
  _embedded?: {
    [K in Exclude<
      keyof DefSchemaSettingDefinitionLinks,
      "self"
    >]?: DefSchemaSettingDefinitionLinks[K] extends ApiLink<infer R>
      ? R
      : never;
  };
}

export interface DefSchemaSettingDefinitionLinks {
  self: ApiLink;
  createdby: ApiLink<User>;
  modifiedby: ApiLink<User>;
}
