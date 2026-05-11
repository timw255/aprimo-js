import { ApiLink } from "./ApiLink";
import { Label } from "./Label";
import { User } from "./User";

/**
 * Data type of a setting definition. Discriminator value for the
 * {@link SettingDefinition} union.
 */
export type SettingDataType =
  | "None"
  | "Boolean"
  | "Text"
  | "Numeric"
  | "DateTime"
  | "Xml"
  | "Role"
  | "Reference"
  | "EncryptedText"
  | "DefSchema";

/**
 * Mode used to combine multiple user-group setting values for a user.
 */
export type UserGroupSettingMode =
  | "None"
  | "MaximumValue"
  | "MinimumValue"
  | "Manual"
  | "FirstValue";

/**
 * Representation of a settingdefinition resource. Discriminated by `dataType`
 * over Boolean/Text/Numeric/DateTime/EncryptedText/Reference/Role/Xml/DefSchema
 * subtype variants.
 */
export interface SettingDefinition {
  /** Shows it the setting allows a system setting. */
  allowSystemSetting: boolean;
  /** Shows it the setting allows a user setting. */
  allowUserSetting: boolean;
  /** Gets the category Id for the setting definition. */
  categoryId: string;
  /** Gets the creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /**
   * Gets the data type of this setting. Discriminator across SettingDefinition
   * subtypes.
   */
  dataType: SettingDataType;
  /** Gets a help url for the setting definition. */
  helpUrl: string;
  /** Gets the Id of the setting definition. */
  id: string;
  /** Collection of localized labels for this setting definition. */
  labels: Label[];
  /** Gets the last modification datetime in UTC time. Format: date-time. */
  modifiedOn: string;
  /** Gets the name of the setting definition. */
  name: string;
  /** Gets the role that needs to be changed. */
  roleRequiredForChange: string;
  /**
   * Gets a tag for this setting containing extra information. This property
   * will not be returned by default. In order to include the property in the
   * response, add a header with the name 'select-settingdefinition' and the
   * value 'Tag' to your request.
   */
  tag: string;
  /**
   * Gets a UserGroupSettingMode for the setting definition.
   */
  userGroupSettingMode: UserGroupSettingMode;
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
