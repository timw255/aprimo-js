import { ApiLink } from "./ApiLink";
import { Label } from "./Label";
import { UserGroupSettingMode } from "./SettingDefinition";
import { User } from "./User";

/**
 * Representation of a XmlSettingDefinition resource. The Xml variant of
 * {@link SettingDefinition}; `dataType` is `"xml"` and the value must conform
 * to `schema`.
 */
export interface XmlSettingDefinition {
  /** Shows it the setting allows a system setting. */
  allowSystemSetting: boolean;
  /** Shows it the setting allows a user setting. */
  allowUserSetting: boolean;
  /** Gets the category Id for the setting definition. */
  categoryId: string;
  /** Gets the creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /**
   * Gets the data type of this setting. Discriminant; `"Xml"` for this variant.
   */
  dataType: "Xml";
  /** Gets a default value of the setting. */
  defaultValue: string;
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
  /** Gets the scheme that the field value should match. */
  schema: string;
  /**
   * Gets a tag for this setting containing extra information. This property
   * will not be returned by default. In order to include the property in the
   * response, add a header with the name 'select-xmlsettingdefinition' and
   * the value 'Tag' to your request.
   */
  tag: string;
  /**
   * Gets a UserGroupSettingMode for the setting definition.
   */
  userGroupSettingMode: UserGroupSettingMode;
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
