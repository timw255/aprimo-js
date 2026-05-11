import { ApiLink } from "./ApiLink";
import { Label } from "./Label";
import { User } from "./User";

/**
 * Representation of a setting category resource.
 */
export interface SettingCategory {
  /** Gets the creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** Gets the Id of this setting category. */
  id: string;
  /** Collection of localized labels for this setting category. */
  labels: Label[];
  /** Gets the last modification datetime in UTC time. Format: date-time. */
  modifiedOn: string;
  /** Gets the name of the setting category. */
  name: string;
  /**
   * Gets or sets the value for the Tag of this object. The value of this
   * property has to be valid Xml. This property will not be returned by
   * default. In order to include the property in the response, add a header
   * with the name 'select-settingcategory' and the value 'Tag' to your
   * request.
   */
  tag: string;
  _links: SettingCategoryLinks;
  _embedded?: {
    [K in Exclude<
      keyof SettingCategoryLinks,
      "self"
    >]?: SettingCategoryLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface SettingCategoryLinks {
  self: ApiLink;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
