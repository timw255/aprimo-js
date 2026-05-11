import { Label } from "./Label";
import { UserGroupSettingMode } from "./SettingDefinition";

/**
 * Representation of a BooleanSettingDefinition resource. The Boolean variant
 * of {@link SettingDefinition}; `dataType` is `"boolean"` and `defaultValue`
 * is a boolean.
 */
export interface BooleanSettingDefinition {
  /** Shows it the setting allows a system setting. */
  allowSystemSetting: boolean;
  /** Shows it the setting allows a user setting. */
  allowUserSetting: boolean;
  /** Gets the category Id for the setting definition. */
  categoryId: string;
  /** Gets the creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /**
   * Gets the data type of this setting. Discriminant; `"Boolean"` for this variant.
   */
  dataType: "Boolean";
  /** Gets a default value of the setting. */
  defaultValue: boolean;
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
  /** Gets a tag for this setting containing extra information. */
  tag: string | null;
  /**
   * Gets a UserGroupSettingMode for the setting definition.
   */
  userGroupSettingMode: UserGroupSettingMode;
}
