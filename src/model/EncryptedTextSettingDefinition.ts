import { ApiLink } from "./ApiLink";
import { User } from "./User";

export interface EncryptedTextSettingDefinition {
  allowSystemSetting: boolean;
  allowUserSetting: boolean;
  categoryId: string;
  createdOn: string;
  dataType: string;
  defaultValue: string;
  helpUrl: string;
  id: string;
  labels: string[];
  modifiedOn: string;
  name: string;
  regularExpression: string;
  roleRequiredForChange: string;
  tag: string;
  userGroupSettingMode: string;
  _links: EncryptedTextSettingDefinitionLinks;
  _embedded?: {
    [K in Exclude<
      keyof EncryptedTextSettingDefinitionLinks,
      "self"
    >]?: EncryptedTextSettingDefinitionLinks[K] extends ApiLink<infer R>
      ? R
      : never;
  };
}

export interface EncryptedTextSettingDefinitionLinks {
  self: ApiLink;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
