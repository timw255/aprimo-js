import { ApiLink } from "./ApiLink";
import { Label } from "./Label";
import { UserGroupSettingMode } from "./SettingDefinition";
import { User } from "./User";

/**
 * Representation of a NumericSettingDefinition resource. The Numeric variant
 * of {@link SettingDefinition}; `dataType` is `"numeric"` and `defaultValue`
 * is an integer.
 */
export interface NumericSettingDefinition {
  /** Shows it the setting allows a system setting. */
  allowSystemSetting: boolean;
  /** Shows it the setting allows a user setting. */
  allowUserSetting: boolean;
  /** Gets the category Id for the setting definition. */
  categoryId: string;
  /** Gets the creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /**
   * Gets the data type of this setting. Discriminant; `"Numeric"` for this variant.
   */
  dataType: "Numeric";
  /** Gets a default value of the setting. Format: int32. */
  defaultValue: number;
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
  /** Gets a possible value range for this setting. */
  range: string;
  /** Gets the role that needs to be changed. */
  roleRequiredForChange: string;
  /**
   * Gets a tag for this setting containing extra information. This property
   * will not be returned by default. In order to include the property in the
   * response, add a header with the name 'select-numericsettingdefinition'
   * and the value 'Tag' to your request.
   */
  tag: string;
  /**
   * Gets a UserGroupSettingMode for the setting definition.
   */
  userGroupSettingMode: UserGroupSettingMode;
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
